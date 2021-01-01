import React, { useState } from "react"
import { createClient } from "../../action/clientAction"
import { connect } from 'react-redux'

const ClientForm = ({createClient}) => {
    const [fullname, setfullName] = useState(0)
    const [pay_rate, setPay_rate] = useState(1)
    const [driver_id, setDriver] = useState(2)

    const handleSubmit = e => {
        e.preventDefault()
        let newClient = {
            full_name: fullname,
            pay_rate: Number(parseInt(pay_rate)),
            driver_id: Number(parseInt(driver_id))
        }

        createClient(newClient)
    }
    return (
        <div><h1>Client Form</h1> 
            <form onSubmit={e => handleSubmit(e)}>
                <input name="full_name" placeholder="fullname" onChange={e => setfullName(e.target.value)} /> <br/>
                <input type="number" name="pay_rate" placeholder="pay_rate" onChange={e => setPay_rate(e.target.value)} /> <br/>
                <input type="number" name="driver_id" placeholder="driver" onChange={e => setDriver(e.target.value)} /> <br/>
                <input type="submit" onClick={ handleSubmit} value="Create Client"/>
            </form>
        </div>
    )
}

export default connect(null, { createClient })(ClientForm)