import React, { useState } from "react"
import { connect } from "react-redux"
import { updateClient, deleteClient } from "../../action/clientAction"
import { Link } from "react-router-dom"

const ClientEdit = ({ updateClient, deleteClient, punches, drivers, history, match, clients, isLoggedIn, current_user }) => {
    const [fullName, setfullName] = useState()
    const [payRate, setPayRate] = useState()
    const [driverId, setDriver] = useState()
    const client = clients.find(client => client.id === match)
    let displayClient = () => {
        if (client !== undefined) {
            return (
                <>
                    <h1>Edit {client.full_name}</h1>
                    <form onSubmit={e => handleSubmit(e)}>
                        <select name="driver_id" onChange={e => setDriver(e.currentTarget.selectedOptions[0].id.split("key")[1])}>
                            <option default >Select Driver</option>
                            {listOfDrivers()}</select> <br />
                        <input name="full_name" placeholder="fullname" onChange={e => setfullName(e.target.value)} /> <br />
                        <input type="number" name="pay_rate" placeholder="pay_rate" onChange={e => setPayRate(e.target.value)} /> <br />
                        <button type="submit" onClick={handleSubmit} >Update Client</button>
                        <button type="submit" onClick={e => handleDelete(e)}>Delete Client</button>
                    </form>
                    <br />
                    <br />

                    <select name="id" onChange={e => createPunchForm(e)}>
                        <option default >Select Punch</option>
                        {listOfPunches()}</select>

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
            return (

                <option key={punch.id} id={"key" + punch.id}>
                    Clocked In: {displayLocalTime(punch.clock_in)} Clocked Out: {displayLocalTime(punch.clock_out)}
                </option>
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
        if (current_user === client.driver.user_id) {
            updateClient(updatedClient)
            setTimeout(() => history.push("/clients/" + updatedClient.id), 2300)
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
            {displayClient()}
            <div>
                <Link to={`/clients/${match}`}>Back</Link>
                {redirect()}
            </div>
        </div>
    )
}

export default connect(null, { updateClient, deleteClient })(ClientEdit)