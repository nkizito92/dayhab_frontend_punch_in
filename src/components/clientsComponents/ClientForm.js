import React, { useState } from "react"
import { createClient } from "../../action/clientAction"
import { connect } from 'react-redux'

const ClientForm = ({ createClient, drivers }) => {
    const [fullname, setfullName] = useState(0)
    const [pay_rate, setPay_rate] = useState(1)
    const [driverId, setDriver] = useState()
    const [flash, setFlash] = useState()
    let flashing = document.getElementById("flash")
    let listOfDrivers = drivers.map(driver => {
        return (
            <option key={driver.id} id={"key" + driver.id}>{driver.first_name} {driver.last_name}</option>
        )
    })
    const handleSubmit = e => {
        e.preventDefault()
        let newClient = {
            full_name: fullname,
            pay_rate: Number(parseInt(pay_rate)),
            driver_id: Number(parseInt(driverId))
        }
        flashing.className = "updated"
        setFlash(`${fullname} is Created!!`)

        createClient(newClient)
    }
    return (
        <div><h1>Client Form</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input name="full_name" placeholder="fullname" onChange={e => setfullName(e.target.value)} /> <br />
                <input type="number" name="pay_rate" placeholder="pay_rate" onChange={e => setPay_rate(e.target.value)} /> <br />
                <select name="driver_id" onChange={e => setDriver(e.currentTarget.selectedOptions[0].id.split("key")[1])}>{listOfDrivers}</select> <br />
                <input type="submit" onClick={handleSubmit} value="Create Client" />
            </form>
            <div id="flash">{flash}</div>
        </div>
    )
}

export default connect(null, { createClient })(ClientForm)