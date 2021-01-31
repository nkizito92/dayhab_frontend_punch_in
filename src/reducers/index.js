import { combineReducers } from 'redux'
import clockinsReducer from './clockinsReducer'
import clientsReducer from './clientsReducer'
import driversReducer from './driversReducer'
import usersReducer from './usersReducer'

export default combineReducers ({
    clockinsReducer,
    clientsReducer,
    driversReducer,
    usersReducer
})