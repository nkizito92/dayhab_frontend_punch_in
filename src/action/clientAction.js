import { onlineUrl } from './urlLink'
export const addClient = client => {
    return({
        type: 'ADD_CLIENT',
        action: client
    })
}

export const fetchClients = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_CLIENTS'})
        fetch(`${onlineUrl()}/clients`).then(res => {
            return res.json()
        })
        .then(disClients => {
            dispatch({type: 'ADD_CLIENTS', clients: disClients})
        })
    }
}