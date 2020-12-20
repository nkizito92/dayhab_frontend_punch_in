const clockinsReducer = (state = {punches: [], loading: false}, action) => {
    switch(action.type) {
        case "LOADING_PUNCHES":
            return {
                ...state,
                punches: [...state.punchIns],
                loading: true
            }

            default:
                return state
    }


}