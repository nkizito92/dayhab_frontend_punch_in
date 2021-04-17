import React, { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { deleteDriver, updateDriver } from '../../action/driverAction'
const DriverEdit = ({ drivers, history, match, deleteDriver, updateDriver, isLoggedIn }) => {
    const driver = drivers.find(driver => driver.id === match)
    const [flash, setFlash] = useState("")
    const [error, setError] = useState("")
    const [fName, setFname] = useState(driver.first_name)
    const [lName, setLname] = useState(driver.last_name)
    let displayDriver = () => {
        if (driver !== undefined) {
            let driversClients = driver.clients.map(client => {
                return (
                    <div key={client.id}>
                        {client.full_name}
                    </div>
                )
            })
            return (
                <div>
                    <h1>Edit {driver.first_name} {driver.last_name}</h1>
                    {driversClients}
                </div>
            )
        } else {
            return (
                <div className="loading"></div>
            )
        }
    }
    let driversInputs = () => {
        if (driver !== undefined) {
            return (
                <>
                    <input type="text" placeholder="first name" name="first_name" onChange={e => setFname(e.target.value)} value={fName} /> <br />
                    <input type="text" placeholder="last name" name="last_name" onChange={e => setLname(e.target.value)} value={lName} /> <br />
                </>
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
        if (fName && lName) {
            document.querySelector("#flashy").className = "updated"
            setFlash(`${driver.first_name} ${driver.last_name} is updated!`)
            updateDriver(updatedDriver)
            setTimeout(() => history.push(`/drivers/${match}`), 2300)
        } else {
            document.querySelector("#fail").className = "error"
            setError("Please fill out all fields!")
        }
    }

    let handleDelete = e => {
        e.preventDefault()
        let removingDriver = {
            id: match,
            first_name: fName,
            last_name: lName
        }
        deleteDriver(removingDriver)
        setFlash(`${driver.first_name} ${driver.last_name} is removed!`)
        setTimeout(() => history.push("/drivers"), 2300)
    }
    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
        }
    }
    return (
        <div>
            <div>
                <h2>Clients:</h2> {displayDriver()}
            </div>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    {driversInputs()}
                    <button type="submit" onClick={handleSubmit}>Update Driver </button>
                    <button type="submit" className="delete" onClick={handleDelete}>Delete Driver </button>
                </form>
            </div>
            <div>
                <Link className="backLink" to={`/drivers/${match}`}>Back</Link>
            </div>
            <div id="flashy">{flash}</div>
            <div id="fail">{error}</div>
            {redirect()}
        </div>
    )
}

export default connect(null, { deleteDriver, updateDriver })(DriverEdit)