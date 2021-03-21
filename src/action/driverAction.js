import { onlineUrl } from './urlLink'
export const addDriver = driver => {
    return ({
        type: "ADD_DRIVER",
        driver: driver
    })
}

export const fetchDrivers = () => dispatch => {
    dispatch({ type: "LOADING_DRIVERS" })
    fetch(`${onlineUrl()}/drivers`).then(res => res.json())
        .then(drivers => dispatch({ type: "ADD_DRIVERS", drivers: drivers }))
}

export const createDriver = driver => dispatch => {
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

export const editDriver = driver => {
    return ({
        type: "EDIT_DRIVER",
        driver: driver
    })
}

export const updateDriver = driverId => dispatch => {
    fetch(`${onlineUrl()}/drivers/${driverId.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ driver: driverId })
    }).then(res => res.json())
        .then(updatedDriver => {
            dispatch(editDriver(updatedDriver))
        }).catch(error => console.log(error))

}
export const removeDriver = driver => {
    return ({
        type: 'DELETE_DRIVER',
        driver: driver
    })
}

export const deleteDriver = driver => dispatch => {
    fetch(`${onlineUrl()}/drivers/${driver.id}`, {
        method: "DELETE",
    }).then(res => res.json())
        .then(deletedDriver => {
            dispatch(removeDriver(deletedDriver))
        })
}