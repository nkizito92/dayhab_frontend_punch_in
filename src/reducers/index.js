import { combineReducers } from 'redux'
import clockinsReducer from './clockinsReducer'
import clientsReducer from './clientsReducer'
import driversReducer from './driversReducer'
import usersReducer from './usersReducer'
import imagesReducer from './imagesReducer'

export default combineReducers ({
    clockinsReducer,
    clientsReducer,
    driversReducer,
    imagesReducer,
    usersReducer
})