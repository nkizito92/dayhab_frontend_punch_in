import React, { useState } from "react"
import { connect } from "react-redux"
import { updateClient, deleteClient } from "../../action/clientAction"
import { Link } from "react-router-dom"

const ClientEdit = ({ updateClient, deleteClient, drivers, history, match, clients }) => {
    const [fullName, setfullName] = useState()
    const [payRate, setPayRate] = useState()
    const [driverId, setDriver] = useState()
    const client = clients.find(client => client.id === match)
    function listOfDrivers() {
        return drivers.map(driver => {
            return (
                <option key={driver.id} id={"key" + driver.id}>{driver.first_name} {driver.last_name}</option>
            )
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        let updatedClient = {
            id: match,
            full_name: fullName,
            pay_rate: payRate,
            driver_id: driverId
        }
        updateClient(updatedClient)
        setTimeout(() => history.push("/clients/" + updatedClient.id), 2300)
    }

    function handleDelete(e) {
        e.preventDefault()
        let deletingClient = {
            id: match,
            full_name: fullName,
            pay_rate: Number(parseInt(payRate)),
            driver_id: Number(parseInt(driverId))
        }
        deleteClient(deletingClient)
        setTimeout(() => history.push("/"), 2300)
    }

    return (
        <div>
            <h1>Edit Client</h1>
            <h2>{client.full_name}</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <input name="full_name" placeholder="fullname" onChange={e => setfullName(e.target.value)} /> <br />
                <input type="number" name="pay_rate" placeholder="pay_rate" onChange={e => setPayRate(e.target.value)} /> <br />
                <select name="driver_id" onChange={e => setDriver(e.currentTarget.selectedOptions[0].id.split("key")[1])}>{listOfDrivers()}</select>
                <button type="submit" onClick={handleSubmit} >Update Client</button>
                <button type="submit" onClick={e => handleDelete(e)}>Delete Client</button>
            </form>
            <div>
                <Link to={`/clients/${match}`}>Back</Link>
            </div>
        </div>
    )
}

export default connect(null, { updateClient, deleteClient })(ClientEdit)
// export default ClientEdit