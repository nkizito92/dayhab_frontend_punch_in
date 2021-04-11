import axios from 'axios'
import { onlineUrl } from './urlLink'

// try adding {withCredentails: true}
export const goLogin = (user, handleLogin, statusMessage) => {
    axios.post(`${onlineUrl()}/login`, { user }, { withCredentails: true }).then(res => {
        if (res.data.logged_in) {
            handleLogin(res.data)
            statusMessage(res.data.message)
        } else {
            statusMessage(res.data.message)
        }
    })
}

export const goSignup = (user, handleLogin, history) => {
    axios.post(`${onlineUrl()}/users`, { user }, { withCredentails: true }).then(res => {
        if (res.data.logged_in) {
            handleLogin(res.data)
            history.push("/clients")
        }
    })
}

export const fetchUsers = () => dispatch => {
    axios.get(`${onlineUrl()}/users`)
        .then(res => dispatch({ type: "ADD_USERS", users: res.data }))
}

export const updateUser = (statusMessage, editedUser) => {
    axios.patch(`${onlineUrl()}/users/${editedUser.id}`, { editedUser }, { withCredentails: false })
        .then(res => {

            if (res.data.message.success) {
                statusMessage(res.data.message)
            }
            else statusMessage(res.data.message)
        })
        .catch(error => console.log(error))

}

export const fetchImages = () => {
    return (dispatch => {
        fetch(`${onlineUrl()}/image_elements`)
            .then(res => res.json())
            .then(images => {
                dispatch({ type: "ADD_IMAGES", images: images })
            })
    }
    )
}
export const addImage = imageData => {
    return {
        type: 'ADD_IMAGE',
        image: imageData
    }
}
export const createImage = (usersImage) => {
    let imageData = new FormData();
    imageData.append('image_element', usersImage.newImage.image[0])
    imageData.append('user_id', usersImage.id)
    imageData.append('client_id', "")
    fetch(`${onlineUrl()}/image_elements`, {
        method: "POST",
        body: imageData
    }).then(res => res.json())
        .then(data => {
            // Tried to get dispatch to work
        })

}

export const editImage = (usersImage, statusMessage) => {
    fetch(`${onlineUrl()}/image_elements/${usersImage.id}`, {
        method: "PATCH",
        body: usersImage.newImage
    }).then(res => res.json())
        .then(data => {
            if (data.message.success) {
                statusMessage(data.message)
            }
            else statusMessage(data.message)
        })

}

export const deleteImage = (usersImage, statusMessage) => {
    fetch(`${onlineUrl()}/image_elements/${usersImage.id}`, {
        method: "DELETE"
    }).then(res => res.json())
        .then(data => {
            if (data.message.success) {
                statusMessage(data.message)
            }
            else statusMessage(data.message)
        })

}