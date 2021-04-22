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

export const createClientImage = (clientsImage) => {
    let imageData = new FormData();
    imageData.append('image_element', clientsImage.newImage.image[0])
    imageData.append('user_id', "")
    imageData.append('client_id', clientsImage.id)
    fetch(`${onlineUrl()}/image_elements`, {
        method: "POST",
        body: imageData
    }).then(res => res.json())
        .then(data => {
            // Tried to get dispatch to work
        })

}

export const updateImage = (clientsImage, statusMessage) => {
    fetch(`${onlineUrl()}/image_elements/${clientsImage.id}`, {
        method: "PATCH",
        body: clientsImage.newImage
    }).then(res => res.json())
        .then(data => {
            if (data.message.success) {
                statusMessage(data.message)
            }
            else statusMessage(data.message)
        })

}

export const deleteImage = (clientsImage, statusMessage) => {
    fetch(`${onlineUrl()}/image_elements/${clientsImage.id}`, {
        method: "DELETE"
    }).then(res => res.json())
        .then(data => {
            if (data.message.success) {
                statusMessage(data.message)
            }
            else statusMessage(data.message)
        })

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