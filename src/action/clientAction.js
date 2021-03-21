import { onlineUrl } from './urlLink'
import axios from 'axios'
export const addClient = client => {
    return ({
        type: 'ADD_CLIENT',
        action: client
    })
}

export const fetchClients = () => dispatch => {
    dispatch({ type: 'LOADING_CLIENTS' })
    fetch(`${onlineUrl()}/clients`).then(res => {
        return res.json()
    })
        .then(disClients => {
            dispatch({ type: 'ADD_CLIENTS', clients: disClients })
        })
}

export const createClient = client => dispatch => {
    fetch(`${onlineUrl()}/clients`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ client: client })
        }).then(res => res.json())
        .then(newClient => dispatch({ type: "ADD_CLIENT", client: newClient }))
}
export const editClient = client => {
    return {
        type: "EDIT_CLIENT",
        client: client
    }
}
export const updateClient = client => dispatch => {
    axios.patch(`${onlineUrl()}/clients/${client.id}`, { client })
        .then(res => dispatch(editClient(res.data)))
}

export const deleteClient = client => dispatch => {
    axios.delete(`${onlineUrl()}/clients/${client.id}`)
        .then(res => dispatch({ type: "DELETE_CLIENT", client: res.data }))
}