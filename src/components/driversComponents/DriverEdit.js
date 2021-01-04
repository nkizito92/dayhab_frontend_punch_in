import React, { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { deleteDriver, updateDriver } from '../../action/driverAction'
const DriverEdit = ({ drivers, history, match, deleteDriver, updateDriver }) => {
    const [flash, setFlash] = useState()
    const [fName, setFname] = useState()
    const [lName, setLname] = useState()
    const driver = drivers.find(driver => driver.id === match)
    let displayDriver = () => {
        if(driver !== undefined) {
          return driver.clients.map(client => {
                return (
                    <div id={client.id}>
                        {client.full_name}
                    </div>
                )
            })
        } else {
            return (
                <div>loading.</div>
            )
        }
    }

    let handleSubmit = e => {
        e.preventDefault()
        let updatedDriver = {
            id: match,
            first_name: fName,
            last_name: lName
        }
        document.querySelector(".flashy").className = "updated"
        setFlash(`${driver.first_name}${driver.last_name} is updated!`)
        updateDriver(updatedDriver)
        setTimeout(() => history.push(`/drivers/${match}`), 2300)
    }
   
    let handleDelete = e => {
        e.preventDefault()
        let removingDriver = {
            id: match,
            first_name: fName,
            last_name: lName
        }
        deleteDriver(removingDriver)
        setFlash(`${driver.first_name}${driver.last_name} is removed!`)
        // let loadingPage = history.location.pathname.split(`drivers/${match}`)[0]
       setTimeout(() => history.push("/drivers"), 2300)
    }   
    return (
        <div>
            
            <h1> Edit Form {driver.first_name} {driver.last_name}</h1>
            <div>
                <h2>Clients:</h2> {displayDriver()}
            </div>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <input type="text" name="first_name" onChange={e => setFname(e.target.value)} placeholder={driver.first_name}  /> <br />
                    <input type="text" name="last_name" onChange={e => setLname(e.target.value)} placeholder={driver.last_name} /> <br />
                    <button type="submit" onClick={handleSubmit}>Update Driver </button>
                    <button type="submit" onClick={handleDelete}>Delete Driver </button>
                </form>
            </div>
            <div>
                <Link to={`/drivers/${match}`}>Back</Link>
            </div>
            <div className="flashy">{flash}</div>
        </div>
    )
}

export default connect(null, {deleteDriver, updateDriver})(DriverEdit)