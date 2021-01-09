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

        case 'EDIT_CLIENT':
            const updatedClient = state.clients.map(client => {
                if(client.id === action.client.id){
                    client.full_name = action.client.full_name
                    client.pay_rate = action.client.pay_rate
                    client.driver_id = action.client.driver_id
                }
                return client
            })
            return {
                ...state,
                clients: updatedClient
            }

            case 'DELETE_CLIENT':
                return {
                    ...state,
                    clients: state.clients.filter(client => client.id !== action.client.id)
                }
        default:
            return state
    }
}

export default clientsReducer