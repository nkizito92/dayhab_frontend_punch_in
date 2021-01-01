import { onlineUrl } from './urlLink'
export const addClient = client => {
    return ({
        type: 'ADD_CLIENT',
        action: client
    })
}

export const fetchClients = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_CLIENTS' })
        fetch(`${onlineUrl()}/clients`).then(res => {
            return res.json()
        })
            .then(disClients => {
                dispatch({ type: 'ADD_CLIENTS', clients: disClients })
            })
    }
}

export const createClient = client => {
    return (dispatch) => {
        fetch(`${onlineUrl()}/clients`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ client: client }) 
            }).then(res => res.json())
            .then(newClient => dispatch({type: "ADD_CLIENT", client: newClient}))
        }
}