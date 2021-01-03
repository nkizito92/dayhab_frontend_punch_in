import { onlineUrl } from './urlLink'
export const addDriver = driver => {
    return ({
        type: "ADD_DRIVER",
        driver: driver
    })
}

export const fetchDrivers = () => {
    return (dispatch) => {
        dispatch({ type: "LOADING_DRIVERS" })
        fetch(`${onlineUrl()}/drivers`).then(res => res.json())
            .then(drivers => {
                dispatch({
                    type: "ADD_DRIVERS",
                    drivers: drivers
                })
            })
    }
}

export const createDriver = driver => {
    return (dispatch) => {
        fetch(`${onlineUrl()}/drivers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ driver: driver })
        }).then(res => res.json())
            .then(newDriver => {
                dispatch(addDriver(newDriver))
            }).catch(error => {
                console.log(error)
            })
    }
}