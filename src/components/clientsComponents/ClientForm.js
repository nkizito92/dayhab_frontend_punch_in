import React, { useState } from "react"
import { createClient } from "../../action/clientAction"
import { connect } from 'react-redux'

const ClientForm = ({ createClient, drivers, clients, history }) => {
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
            pay_rate: Number(parseInt(pay_rate)),
            driver_id: Number(parseInt(driverId))
        }
        if (fullname !== undefined && pay_rate !== undefined && driverId !== undefined) {
            flashing.className = "updated"
            setFlash(`${fullname} is Created!!`)

            createClient(newClient)
            setTimeout(() => history.push('/clients'), 2300)
        } else {
            debugger
            errors.className = "error"
            setError("Please Fill All Fields Out")
        }
    }
    return (
        <div><h1>Client Form</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input name="full_name" placeholder="fullname" onChange={e => setfullName(e.target.value)} /> <br />
                <input type="number" name="pay_rate" placeholder="pay_rate" onChange={e => setPay_rate(e.target.value)} /> <br />
                <select name="driver_id" onChange={e => setDriver(e.currentTarget.selectedOptions[0].id.split("key")[1])}>
                    <option default >Select Driver</option>
                    {listOfDrivers}</select> <br />
                <input type="submit" onClick={e => handleSubmit(e)} value="Create Client" />
            </form>
            <div id="flash">{flash}</div>
            <div id="fail">{error}</div>
        </div>
    )
}

export default connect(null, { createClient })(ClientForm)