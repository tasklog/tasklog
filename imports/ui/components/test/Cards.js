import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Card from '/imports/ui/components/test/Card'
import Target from '/imports/ui/components/test/Target'

class Cards extends Component {
    state = {
        cards: [
            {
                id: 1,
                text: 'Do laundry',
            }, {
                id: 2,
                text: 'Finish homework for interactive systems',
            }, {
                id: 3,
                text: 'Go to the bank',
            }, {
                id: 4,
                text: 'Cook dinner and meal prep',
            }, {
                id: 5,
                text: 'Study for test',
            }
        ]
    }

    moveCard = (dragIndex, hoverIndex) => {
        const { cards } = this.state
        const dragCard = cards[dragIndex]

        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    }

    render() {
        return (
            <div className='log'>
                <Target />
                {this.state.cards.map((card, i) => (
                    <Card
                        key={card.id}
                        index={i}
                        id={card.id}
                        text={card.text}
                        moveCard={this.moveCard}
                    />
                ))}
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Cards)