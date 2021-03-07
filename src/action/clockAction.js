import { onlineUrl } from './urlLink'
import axios from 'axios'

export const fetchPunches = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_PUNCHES' })
        fetch(`${onlineUrl()}/punches`).then(res => {
            return res.json()
        }).then(punch => {
            dispatch({ type: 'ADD_PUNCHES', punches: punch })
        })
    }


}

export const addPunch = punched => {
    return ({
        type: "ADD_PUNCH",
        punch: punched
    })
}

export const createPunch = (punched, statusMessage) => {
    return (dispatch) => {
        axios.post(`${onlineUrl()}/punches`, {punched})
            .then(res => {
                dispatch(addPunch(res.data.punched))
                statusMessage(res.data.message)
            })
    }
}

export const deletePunch = (punches, deletingPunch) => {
    function deleteRequest(obj, obj_id, dispatch) {
        axios.delete(`${onlineUrl()}/punches/${obj_id}`, { obj })
            .then(res => dispatch({ type: "DELETE_PUNCH", punch: res.data }))
            .catch(error => console.log(error))
    }
    return (dispatch) => {
        if (deletingPunch.clock_in !== null && punches[1]) {
            deleteRequest(deletingPunch, deletingPunch.id + 1, dispatch)
            deleteRequest(deletingPunch, deletingPunch.id, dispatch)
        } else {
            deleteRequest(deletingPunch, deletingPunch.id, dispatch)
        }
    }

}

export const updatePunch = punch => {
    return (dispatch) => {
        axios.patch(`${onlineUrl()}/punches/${punch.id}`, { punch })
            .then(res => dispatch({ type: "EDIT_PUNCH", punch: res.data }))
    }
}