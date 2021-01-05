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
            const editedDriver = state.drivers.map(driver => {
                if (driver.id === action.driver.id) {
                    driver.first_name = action.driver.first_name
                    driver.last_name = action.driver.last_name
                }
                return driver
            })
            return {
                ...state,
                drivers: editedDriver
            }

        case 'DELETE_DRIVER':
            debugger
           return {
                ...state,
                drivers: state.drivers.map(driver => driver.id !== action.driver.id)
                // drivers: [...state.drivers.slice(0, driverId), ...state.drivers.slice(driverId + 1)]
            }

        default:
            return state
    }
}

export default driversReducer