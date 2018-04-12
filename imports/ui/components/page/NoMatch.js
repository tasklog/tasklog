import React from 'react'
import moment from 'moment'
import { Redirect } from 'react-router'

const NoMatch = () => (
    <Redirect to={`/d/${moment().year()}/${moment().month()+1}/${moment().date()}`} />
)

export default NoMatch