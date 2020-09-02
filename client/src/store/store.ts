import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducer/rootReducer'
import logger from 'redux-logger'

const initState={}
const middlewares=[logger]

const store=createStore(rootReducer,applyMiddleware(...middlewares))


export default store



