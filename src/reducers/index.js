import { combineReducers } from 'redux'
import clockinsReducer from './clockinsReducer'
import clientsReducer from './clientsReducer'

export default combineReducers ({
    clockinsReducer,
    clientsReducer
})