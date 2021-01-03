const driversRducer = (state = { drivers: [], loading: false }, action) => {
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

        default:
            return state
    }
}

export default driversRducer