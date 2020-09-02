import React from 'react'
import getName from './getName'
import {combineReducers} from 'redux'


const rootReducer=combineReducers({
    getN:getName
})

export default rootReducer
