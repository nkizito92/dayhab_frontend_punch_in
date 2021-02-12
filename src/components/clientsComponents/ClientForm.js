import React, { useState } from "react"
import { createClient } from "../../action/clientAction"
import { connect } from 'react-redux'

const ClientForm = ({ createClient, drivers, history, isLoggedIn }) => {
    const [fullname, setfullName] = useState(undefined)
    const [pay_rate, setPay_rate] = useState(undefined)
    const [driverId, setDriver] = useState(undefined)
    const [flash, setFlash] = useState()
    const [error, setError] = useState()
    
    let listOfDrivers = drivers.map(driver => {
        return (
            <option key={driver.id} id={"key" + driver.id}>{driver.first_name} {driver.last_name}</option>
        )
    })
    function handleSubmit(e) {
        let flashing = document.getElementById("flash")
        let errors = document.getElementById("fail")
        
        e.preventDefault()
        let newClient = {
            full_name: fullname,
            pay_rate: Number(parseFloat(pay_rate)),
            driver_id: Number(parseInt(driverId))
        }
        if (fullname !== undefined && pay_rate !== undefined && driverId !== undefined) {
            flashing.className = "updated"
            setFlash(`${fullname} is Created!!`)

            createClient(newClient)
            setTimeout(() => {
                if(history!==undefined)
                history.push('/clients')
            }, 2300)
        } else {
            errors.className = "error"
            setError("Please Fill All Fields Out")
        }
    }
    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
        }
    }
    return (
        <div><h1>Client Form</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input name="full_name" placeholder="fullname" onChange={e => setfullName(e.target.value)} /> <br />
                <input type="number" min="0" step="0.01" name="pay_rate" placeholder="pay_rate" onChange={e => setPay_rate(e.target.value)} /> <br />
                <select name="driver_id" onChange={e => setDriver(e.currentTarget.selectedOptions[0].id.split("key")[1])}>
                    <option default >Select Driver</option>
                    {listOfDrivers}</select> <br />
                <button onClick={e => handleSubmit(e)}>Create Client</button>
            </form>
            <div id="flash">{flash}</div>
            <div id="fail">{error}</div>
            {redirect()}
        </div>
    )
}

export default connect(null, { createClient })(ClientForm)