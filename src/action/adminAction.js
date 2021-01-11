import axios from 'axios'
import { onlineUrl } from './urlLink'

// try adding {withCredentails: true}
export const goLogin = (user, handleLogin, history) => {
    axios.post(`${onlineUrl()}/login`, { user }, { withCredentails: true }).then(res => {
        if (res.data.logged_in) {
            handleLogin(res.data)
            setTimeout(() => history.push("/clients"), 2200)
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

