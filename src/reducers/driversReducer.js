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
           return {
                ...state,
                drivers: state.drivers.filter(driver => driver.id !== action.driver.id)
            }

        default:
            return state
    }
}

export default driversReducer