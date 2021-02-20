import React, { useState } from "react"
import { connect } from "react-redux"
import { updateClient, deleteClient } from "../../action/clientAction"
import { Link } from "react-router-dom"

const ClientEdit = ({ updateClient, deleteClient, punches, drivers, history, match, clients, isLoggedIn, current_user }) => {
    const client = clients.find(client => client.id === match)
    const [fullName, setfullName] = useState(client.full_name)
    const [payRate, setPayRate] = useState(client.pay_rate)
    const [driverId, setDriver] = useState(client.driver_id)
    const [flash, setFlash] = useState()
    const [error, setError] = useState()

    let displayPunchForms = () => {
        if (listOfPunches()[1]) {
            return (
                <select name="id" onChange={e => createPunchForm(e)}>
                    <option default >Select Punch</option>
                    {listOfPunches()}</select>
            )
        }
        else {
            return <h3>There's No Punches!</h3>
        }
    }
    let displayClientForm = () => {
        if (client !== undefined) {
            return (
                <>
                    <h1>Edit {client.full_name}</h1>
                    <form onSubmit={e => handleSubmit(e)}>
                        <h2>Client's Driver is {client.driver.first_name} {client.driver.last_name}</h2>
                        <select name="driver_id" onChange={e => setDriver(e.currentTarget.selectedOptions[0].id.split("key")[1])}>
                            <option default hidden >{client.driver.first_name} {client.driver.last_name}</option>
                            {listOfDrivers()}
                        </select> <br />
                        <input name="full_name" placeholder="full name" onChange={e => setfullName(e.target.value)} value={fullName} /> <br />
                        <input type="number" min="0" step="0.01" name="pay_rate" placeholder="pay rate" onChange={e => setPayRate(e.target.value)} value={payRate} /> <br />
                        <button type="submit" onClick={handleSubmit} >Update Client</button>
                        <button type="submit" onClick={e => handleDelete(e)}>Delete Client</button>
                    </form>
                    <br />
                    <br />

                    {displayPunchForms()}

                </>
            )
        } else {
            return <div className="loading"></div>
        }
    }
    function listOfDrivers() {
        return drivers.map(driver => {
            return (
                <option key={driver.id} id={"key" + driver.id}>{driver.first_name} {driver.last_name}</option>
            )
        })
    }
    function displayLocalTime(mins) {
        if (mins) {
            let localTime = 0
            let hours = Number(parseInt(mins.split("").slice(0, 2).join("")))
            if (hours === 0) hours = 1
            let minutes = Number(parseInt(mins.split("").slice(2, 4).join("")))
            if (minutes < 10) minutes = (`0${minutes}`)

            if (hours >= 12 && hours < 24) {
                if (hours > 12) hours = hours - 12
                localTime = `${hours}:${minutes} PM`
            }
            else if (hours < 13 || hours === 24) {
                if (hours === 24) hours = hours - 12
                localTime = `${hours}:${minutes} AM`
            }
            return localTime
        }
    }

    function createPunchForm(e) {
        let findThePunches = punches.filter(punch => punch.client_id === client.id)
        let thisPunch = findThePunches.find(punch => punch.id ===
            Number(parseInt(e.currentTarget.selectedOptions[0].id.split("key")[1])))
        setTimeout(() => {
            history.push(`/punches/${thisPunch.id}/edit`)
        }, 3300);
    }

    function listOfPunches() {
        let findThePunches = punches.filter(punch => punch.client_id === client.id)
        return findThePunches.map(punch => {
            if (punch.clock_in) {
                return (
                    <option key={punch.id} id={"key" + punch.id}>
                        Clocked In: {displayLocalTime(punch.clock_in)} On {punch.month_day}
                    </option>
                )
            } else {
                return (
                    <>
                        <option key={punch.id} id={"key" + punch.id}>
                            Clocked Out: {displayLocalTime(punch.clock_out)} On {punch.month_day}
                        </option>
                        <option disabled>=============================</option>
                    </>
                )
            }
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
        if (current_user === client.driver.user_id && driverId) {
            document.querySelector("#success").className = "updated"
            setFlash("Client Updated!!")
            updateClient(updatedClient)
            setTimeout(() => history.push("/clients/" + updatedClient.id), 2300)
        } else {
            document.querySelector("#fail").className = "error"
            setError("Please fill Out all fields")
        }
    }

    function handleDelete(e) {
        e.preventDefault()
        let deletingClient = {
            id: match,
            full_name: fullName,
            pay_rate: Number(parseInt(payRate)),
            driver_id: Number(parseInt(driverId))
        }
        if (current_user === client.driver.user_id) {
            document.getElementById("success").className = "updated"
            setFlash("Client Delete!!")
            deleteClient(deletingClient)
            setTimeout(() => history.push("/clients"), 2300)
        }
    }

    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
        }
    }
    return (
        <div>
            {displayClientForm()}
            <div>
                <Link to={`/clients/${match}`}>Back</Link>
                {redirect()}
            </div>
            <div id="success">{flash}</div>
            <div id="fail">{error}</div>
        </div>
    )
}

export default connect(null, { updateClient, deleteClient })(ClientEdit)