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

export const updateUser = (statusMessage, editedUser) => dispatch => {
    axios.patch(`${onlineUrl()}/users/${editedUser.id}`, { editedUser }, { withCredentails: false })
        .then(res => {

            if (res.data.message.success) {
                statusMessage(res.data.message)
                dispatch({ type: "EDIT_USER", user: res.data })
            }
            else statusMessage(res.data.message)
        })
        .catch(error => console.log(error))

}