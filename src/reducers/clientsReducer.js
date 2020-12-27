const clientsReducer = (state= {clients: [], loading: false}, action) => {
    switch(action.type){
        case 'LOADING_CLIENTS':
            return {
                ...state,
                clients: [...state.clients],
                loading: true
            }
        
        case 'ADD_CLIENTS':
            return {
                ...state,
                clients: action.clients
            }

        case 'ADD_CLIENT':
            return {
                ...state,
                clients: [...state.clients, action.client]
            }
        default:
            return state


    }
}

export default clientsReducer