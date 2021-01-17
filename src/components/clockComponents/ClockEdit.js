import { connect } from "react-redux"
import React, { useState } from "react"
import { updatePunch, deletePunch } from "../../action/clockAction"
import { Link} from 'react-router-dom'
const ClockEdit = ({ isLoggedIn, punches, history, match, updatePunch, deletePunch }) => {
    let punch = punches.find(punch => punch.id === match)
    const [clockIn, setClIn] = useState()
    const [clockOut, setClOut] = useState()
    function displayLocalTime(mins) {
        if (mins !== null) {
            let localTime = 0
            let hours = Number(parseInt(mins.split("").slice(0, 2).join("")))
            let minutes = Number(parseInt(mins.split("").slice(2, 4).join("")))
            if (minutes < 10) minutes = (`0${minutes}`)
            if (hours > 12) {
                localTime = (hours - 12) + ":" + minutes + " PM"
            }
            else { localTime = hours + ":" + minutes + " AM" }
            return localTime
        }
    }
    let displayPunchForm = () => {
        if (punch !== undefined) {
            let clockInHours = punch.clock_in
            let clockOutHours = punch.clock_out
            if (punch.clock_in) {
                return (
                <>
                    <label>Clock In Time Was {displayLocalTime(clockInHours)}</label> <br />
                    <input type="time" name="clock_in" onChange={e => setClIn(e.target.value)} /> <br />
                </>
                )
            }
            else {
                return (
                    <>
                        <label>Clock Out Time Was {displayLocalTime(clockOutHours)}</label><br/>
                        <input type="time" name="clock_out" onChange={e => setClOut(e.target.value)} placeholder={displayLocalTime(clockOutHours)} /> <br />
                    </>
                )
            }
        } else {
            return <div className="loading"></div>
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        let convertLocalTime = ""
        clockIn ? convertLocalTime = clockIn : convertLocalTime = clockOut
        let hours = Number(parseInt(convertLocalTime.split(":")[0]))
        let minutes = convertLocalTime.split(":")[1]
        if(hours === 0 ) hours = 24
        let timeItis = ""
        timeItis = hours + minutes
        let punchUpdated = {
            id: match,
            clock_in: clockIn,
            clock_out: clockOut,
        }
        if(clockIn) {
            punchUpdated.clock_in = timeItis
        } else {
            punchUpdated.clock_out = timeItis
        }
        updatePunch(punchUpdated)
        setTimeout(() => history.push("/clients/" + punch.client_id), 2300)
    }
    function handleDelete(e) {
        e.preventDefault()
        let deletingPunch = {
            id: match,
            clock_in: punch.clock_in,
            clock_out: punch.clock_out
        }
        deletePunch(deletingPunch)
        setTimeout(() => history.push("/clients/" + punch.client_id), 2300)
    }
    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
        } else {
           return <Link to={`/clients`}>Go Back</Link>
        }
    }
    return (
        <main>
            <h1>Edit Punch</h1>
            <form onSubmit={e => handleSubmit(e)}>

                {displayPunchForm()}
                <input type="submit" value="Upated Punch" onClick={handleSubmit} />
                <input type="submit" value="Delete Punch" onClick={e => handleDelete(e)} />
            </form>
            {redirect()}
        </main>
    )
}
export default connect(null, { updatePunch, deletePunch })(ClockEdit)