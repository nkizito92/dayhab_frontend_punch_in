import { onlineUrl } from './urlLink'

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