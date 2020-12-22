const clockinsReducer = (state = {punches: [], loading: false}, action) => {
    switch(action.type) {
        case "LOADING_PUNCHES":
            return {
                ...state,
                punches: [...state.punches],
                loading: true
            }

            case "ADD_PUNCHES": 
                return {
                    ...state,
                    punches: action.punches
                }

            default:
                return state
    }


}

export default clockinsReducer