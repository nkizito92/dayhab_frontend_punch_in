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
            
            case "ADD_PUNCH":
                return {
                    ...state,
                    punches: [...state.punches, action.punch]
                }

            case "EDIT_PUNCH":
                const editPunch = state.punches.map(punch => {
                    if(punch.id === action.punch.id) {
                        punch.clock_in = action.punch.clock_in
                        punch.clock_out = action.punch.clock_out
                        punch.date = action.punch.date
                    }
                    return punch
                })
                return{
                    ...state,
                    punches: editPunch
                }

            case 'DELETE_PUNCH':
                return {
                    ...state,
                    punches: state.punches.filter(punch => punch.id !== action.punch.id)
                }

            default:
                return state
    }


}

export default clockinsReducer