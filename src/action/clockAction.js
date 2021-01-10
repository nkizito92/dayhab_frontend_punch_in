import { onlineUrl } from './urlLink'
import axios from 'axios'
export const fetchPunches = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_PUNCHES'})
        fetch(`${onlineUrl()}/punches`).then(res => {
            return res.json()
        }).then(punch => {
            dispatch({ type: 'ADD_PUNCHES', punches: punch})
        })
    }


}

export const addPunch = punched => {
    return ({
        type: "ADD_PUNCH",
        punch: punched
    })
}

export const createPunch = punched => {
    return (dispatch) => {
        fetch(`${onlineUrl()}/punches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ punch: punched })
        }

        )
            .then(res => res.json())
            .then(punchIn => dispatch(addPunch(punchIn)))
            .catch(error => {
                console.log(error)
            })
    }
}

export const deletePunch = punch => {
    return (dispatch) => {
        axios.delete(`${onlineUrl()}/punches/${punch.id}`,{punch})
        .then(res => dispatch({type: "DELETE_PUNCH", punch: res.data}))
    }
}

export const updatePunch = punch => {
    return (dispatch) => {
        axios.patch(`${onlineUrl()}/punches/${punch.id}`,{punch})
        .then(res => dispatch({type: "EDIT_PUNCH", punch: res.data}))
    }
}