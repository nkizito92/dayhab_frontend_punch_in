const driversReducer = (state = { drivers: [], loading: false }, action) => {
    switch (action.type) {
        case 'LOADING_DRIVERS':
            return {
                ...state,
                drivers: [...state.drivers],
                loading: true
            }

        case 'ADD_DRIVERS':
            return {
                ...state,
                drivers: action.drivers
            }

        case 'ADD_DRIVER':
            return {
                ...state,
                drivers: [...state.drivers, action.driver]
            }

        case 'EDIT_DRIVER':
            const driver_Id = state.drivers.findIndex(driver => driver.id === action.driver.id)
            return {
                ...state,
                drivers: [...state.drivers.slice(0, driver_Id), ...state.drivers.slice(driver_Id + 1)]
            }

        case 'DELETE_DRIVER':
            const driverId = state.drivers.findIndex(driver => driver.id === action.driver.id)
            return {
                ...state,
                drivers: [...state.drivers.slice(0, driverId), ...state.drivers.slice(driverId + 1)]
            }

        default:
            return state
    }
}

export default driversReducer