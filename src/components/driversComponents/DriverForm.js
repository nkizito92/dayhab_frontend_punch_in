import { connect } from 'react-redux'
import { createDriver } from '../../action/driverAction'
import React, { useState } from 'react'

const DriverForm = ({ createDriver }) => {
    const [fName, setFname] = useState();
    const [lName, setLname] = useState();
    const [flash, setFlash] = useState();
    const [error, setError] = useState();
    
    let handleSumbit = e => {
        let flashing = document.getElementById("flash")
        e.preventDefault()
        let newDriver = {
            first_name: fName,
            last_name: lName
        }

        if(fName !== undefined && lName !== undefined){
            flashing.className = "updated"
            setFlash(`${fName}, ${lName} Created!`)
            createDriver(newDriver)
        } else {
            document.getElementById("fail").className = "error"
            setError("Please fill in the fields")
            setLname(undefined)
            setFname(undefined)
        }
    }

    return (
        <div>
            <h1>Create Driver</h1>
            <form onSubmit={e => handleSumbit(e)}>
                <input id="firstName" type="text" name="first_name" onChange={e => setFname(e.target.value)} placeholder="First name" /> <br />
                <input id="lastName" type="text" name="last_name" onChange={e => setLname(e.target.value)} placeholder="Last name" /> <br />
                <input type="submit" value="Create Driver" onClick={handleSumbit} />
            </form>
            <div id="flash">{flash}</div>
            <div id="fail">{error}</div>
        </div>
    )
}

export default connect(null, { createDriver })(DriverForm)