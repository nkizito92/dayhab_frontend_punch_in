import { connect } from 'react-redux'
import { createDriver } from '../../action/driverAction'
import React, { useState } from 'react'

const DriverForm = ({ createDriver, history, isLoggedIn, current_user }) => {
    const [fName, setFname] = useState();
    const [lName, setLname] = useState();
    const [flash, setFlash] = useState();
    const [error, setError] = useState();

    let handleSumbit = e => {
        let flashing = document.getElementById("flash")
        e.preventDefault()
        let newDriver = {
            first_name: fName,
            last_name: lName,
            user_id: current_user
        }

        if (fName !== undefined && lName !== undefined) {
            flashing.className = "updated"
            setFlash(`${fName} ${lName} Created!`)
            createDriver(newDriver)
            setTimeout(() => history.push("/drivers"), 2200);
        } else {
            document.getElementById("fail").className = "error"
            setError("Please fill in the fields")
            setLname(undefined)
            setFname(undefined)
        }
    }
    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
        }
    }
    return (
        <div>
            <h1>Create Driver</h1>
            <form onSubmit={e => handleSumbit(e)}>
                <input id="firstName" type="text" name="first_name" onChange={e => setFname(e.target.value)} placeholder="First name" /> <br />
                <input id="lastName" type="text" name="last_name" onChange={e => setLname(e.target.value)} placeholder="Last name" /> <br />
                <button onClick={handleSumbit} >Create Driver</button>
            </form>
            <div id="flash">{flash}</div>
            <div id="fail">{error}</div>
            {redirect()}
        </div>
    )
}

export default connect(null, { createDriver })(DriverForm)