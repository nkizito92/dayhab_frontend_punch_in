import { connect } from "react-redux"
import React, { useState } from "react"
import { updatePunch, deletePunch } from "../../action/clockAction"
import { Link } from 'react-router-dom'
const ClockEdit = ({ isLoggedIn, punches, history, match, updatePunch, deletePunch }) => {
    let punch = punches.find(punch => punch.id === match)
    const [clockIn, setClIn] = useState()
    const [clockOut, setClOut] = useState()
    const [month, setMonth] = useState(new Date().toLocaleDateString("sv"))
    const [flash, setFlash] = useState()
    const [error, setError] = useState()
    function displayLocalTime(mins) {
        if (mins !== null) {
            let localTime = 0
            let hours = Number(parseInt(mins.split("").slice(0, 2).join("")))
            if (hours === 0) hours = 1
            let minutes = Number(parseInt(mins.split("").slice(2, 4).join("")))
            if (minutes < 10) minutes = (`0${minutes}`)
            if (hours > 12 && hours < 24) {
                localTime = (hours - 12) + ":" + minutes + " PM"
            }
            else if (hours < 13 || hours === 24) {
                if (hours === 24) hours = hours - 12
                localTime = hours + ":" + minutes + " AM"
            }
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
                        <label>Clock In Time Was {displayLocalTime(clockInHours)} On {punch.month_day}</label> <br />
                        <input type="time" name="clock_in" onChange={e => setClIn(e.target.value)} /> <br />
                        <input type="date" name="month_day" onChange={e => setMonth(e.target.value)} defaultValue={new Date().toLocaleDateString("sv")} /> <br />
                    </>
                )
            }
            else {
                return (
                    <>
                        <label>Clock Out Time Was {displayLocalTime(clockOutHours)} On {punch.month_day}</label><br />
                        <input type="time" name="clock_out" onChange={e => setClOut(e.target.value)} /> <br />
                        <input type="date" name="month_day" onChange={e => setMonth(e.target.value)} defaultValue={new Date().toLocaleDateString("sv")} /> <br />
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
        let hours;
        let minutes;
        if (convertLocalTime){
            hours = Number(parseInt(convertLocalTime.split(":")[0]))
            minutes = convertLocalTime.split(":")[1]
        }
        if (hours === 0) hours = 24
        if (hours < 10) hours = `0${hours}`
        let timeItis = ""
        timeItis = hours + minutes
        let mon = Number.parseInt(month.slice(5,7)) - 1
        let day = Number.parseInt(month.slice(8))
        let year = Number.parseInt(month.slice(0,4))
        let date = new Date(year, mon, day).toDateString().slice(4, 8)
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        let punchUpdated = {
            id: match,
            clock_in: clockIn,
            clock_out: clockOut,
            date: monthNames[mon],
            month_day: date + day
        }
        if (clockIn) {
            punchUpdated.clock_in = timeItis
        } else {
            punchUpdated.clock_out = timeItis
        }
        if (convertLocalTime) {
            document.getElementById("success").className = "updated"
            setFlash("Time Updated!!")
            updatePunch(punchUpdated)
            setTimeout(() => history.push("/clients/" + punch.client_id), 2300)
        } else {
            document.getElementById("fail").className = "error"
            setError("Please add a time")
        }
    }
    function handleDelete(e) {
        e.preventDefault()
        let deletingPunch = {
            id: match,
            clock_in: punch.clock_in,
            clock_out: punch.clock_out
        }
        let clientsPunches = punches.filter(punched => punched.client.full_name === punch.client.full_name)
        document.getElementById("success").className = "updated"
        setFlash("Time Delete!!")
        deletePunch(clientsPunches, deletingPunch)
        setTimeout(() => history.push("/clients/" + punch.client_id), 2300)
    }
    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
        } else if(punch){
            return <Link to={`/clients/${punch.client_id}/edit`}>Go Back</Link>
        } else {
            return <Link to={"/clients"}>Go Back</Link>
        }
    }
    return (
        <main>
            <h1>Edit Punch</h1>
            <form onSubmit={e => handleSubmit(e)}>

                {displayPunchForm()}
                <button onClick={handleSubmit} > Upated Punch</button>
                <button onClick={e => handleDelete(e)} > Delete Punch</button>
            </form>
            {redirect()}
            <div id="success">{flash}</div>
            <div id="fail">{error}</div>
        </main>
    )
}
export default connect(null, { updatePunch, deletePunch })(ClockEdit)