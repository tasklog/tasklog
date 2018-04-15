 'use strict';
 // --------------- Helpers that build all of the responses -----------------------

function elicitSlot(sessionAttributes, intentName, slots, slotToElicit, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
        },
    };
}

function confirmIntent(sessionAttributes, intentName, slots, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ConfirmIntent',
            intentName,
            slots,
            message,
        },
    };
}

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}

// ---------------- Helper Functions --------------------------------------------------

function parseLocalDate(date) {
    /**
     * Construct a date object in the local timezone by parsing the input date string, assuming a YYYY-MM-DD format.
     * Note that the Date(dateString) constructor is explicitly avoided as it may implicitly assume a UTC timezone.
     */
    const dateComponents = date.split(/\-/);
    return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
}

function getDayDifference(earlierDate, laterDate) {
    const laterDateInDaysSinceEpoch = new Date(laterDate).getTime() / 86400000;
    const earlierDateInDaysSinceEpoch = new Date(earlierDate).getTime() / 86400000;
    //return Number(laterDateInDaysSinceEpoch - earlierDateInDaysSinceEpoch).toFixed(0);
}

function isValidDate(date) {
    try {
        return !(isNaN(parseLocalDate(date).getTime()));
    } catch (err) {
        return false;
    }
}

function isValidLog(log){
    const validLog = ['daily', 'weekly', 'monthly', 'yearly'];
    return (validLog.indexOf(log.toLowerCase()) > -1);
}


function buildValidationResult(isValid, violatedSlot, messageContent) {
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
    };
}

function isValidMonth(month) {
    const validMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august','september', 'october', 'november', 'december'];
    return (validMonths.indexOf(month.toLowerCase()) > -1);
}

function validateTask(slots){
    const logChoice = slots.LogChoice;
    const dateChoice = slots.DateChoice;
    const monthChoice = slots.MonthChoice;
    
    if (!isValidMonth(monthChoice)){
        return buildValidationResult(false, 'MonthChoice', 'I did not understand your month choice. Please restate the month.');
    }
    
    if (parseLocalDate){
        if(!isValidDate(dateChoice) <= new Date())
            return buildValidationResult(false, 'DateChoice', 'Tasks must be scheduled for today or later. Can you try a different date?');
    }
    
    if (logChoice){
        if(!isValidLog(logChoice))
            return buildValidationResult(false, 'LogChoice', 'I did not understand the log choice. Please choose daily, weekly, monthly, or yearly log');
    }
}

/**
 * Performs dialog management and fulfillment for setting a task.
 */
 
 function setTask(intentRequest, callback) {
    const slots = intentRequest.currentIntent.slots;
    const logChoice = slots.LogChoice;
    const dateChoice = slots.DateChoice;
    const monthChoice = slots.MonthChoice;
    const taskName = intentRequest.currentIntent.slots.TaskName;
    const sessionAttributes = intentRequest.sessionAttributes || {};
    
    const task = String(JSON.stringify({ TaskName: taskName, LogChoice: logChoice, DateChoice: dateChoice, MonthChoice: monthChoice }));
    sessionAttributes.currentTask = task;
    
    if (intentRequest.invocationSource === 'DialogCodeHook') {
        // Validate any slots which have been specified.  If any are invalid, re-elicit for their value
        const validationResult = validateTask(intentRequest.currentIntent.slots);
        if (!validationResult.isValid) {
            const slots = intentRequest.currentIntent.slots;
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(sessionAttributes, intentRequest.currentIntent.name,
            slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
    }
    
    const https = require('https');
    
    var postData = JSON.stringify({
        'text' : taskName
    });
    
    var options = {
      hostname: 'fuzzy-lizard-11.localtunnel.me',
      port: 443,
      path: '/api/task/create',
      method: 'POST',
      headers: {
           'Content-Type': 'application/json',
           'Content-Length': postData.length
         }
    };
    
    var req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
    
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    
    req.write(postData);
    req.end();
    
    delete sessionAttributes.currentTask;
    
    callback(close(sessionAttributes, 'Fulfilled',
    { contentType: 'PlainText', content: 'Task has been added' }));
 }
 
 function readTask(intentRequest, callback){
    const slots = intentRequest.currentIntent.slots;
    const sessionAttributes = intentRequest.sessionAttributes || {};
    
    const https = require('https');
    
    var options = {
      hostname: 'fuzzy-lizard-11.localtunnel.me',
      port: 443,
      path: '/api/task/read',
      method: 'GET'
    };
    
    var req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
    let data = '';
      res.on('data', (d) => {
        data+=d;
      });
      res.on('end', () => {
        data = JSON.parse(data); 
        callback(close(sessionAttributes, 'Fulfilled',{
            contentType: 'PlainText', 
            content: data.text
        }));
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    
    req.end();
    
    delete sessionAttributes.currentTask;
    
 }
 
  // --------------- Intents -----------------------

/**
 * Called when the user specifies an intent for this skill.
 */
function dispatch(intentRequest, callback) {
    // console.log(JSON.stringify(intentRequest, null, 2));
    console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);

    const intentName = intentRequest.currentIntent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'SetTask') {
        return setTask(intentRequest, callback);
    } else if (intentName === 'ReadTask') {
        return readTask(intentRequest, callback);
    }
    throw new Error(`Intent with name ${intentName} not supported`);
    
}

// --------------- Main handler -----------------------

function loggingCallback(response, originalCallback) {
    // console.log(JSON.stringify(response, null, 2));
    originalCallback(null, response);
}

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        // By default, treat the user request as coming from the America/New_York time zone.
        process.env.TZ = 'America/New_York';
        console.log(`event.bot.name=${event.bot.name}`);

        /**
         * Uncomment this if statement and populate with your Lex bot name, alias and / or version as
         * a sanity check to prevent invoking this Lambda function from an undesired source.
         */
        /*
        if (event.bot.name != 'BookTrip') {
             callback('Invalid Bot Name');
        }
        */
        dispatch(event, (response) => loggingCallback(response, callback));
    } catch (err) {
        callback(err);
    }
};
