import { connect } from "react-redux"
import React, {useState } from "react"
import { updatePunch, deletePunch } from "../../action/clockAction"
const ClockEdit = ({ punches, history, match, updatePunch, deletePunch }) => {
    let punch = punches.find(punch => punch.id === match)
    const [clockIn, setClIn] = useState()
    const [clockOut, setClOut] = useState()
    let displayPunchForm = () => {
        if (punch !== undefined) {
            return (
                <form onSubmit={e => handleSubmit(e)}>
                    <input name="clock_in" onChange={e => setClIn(e.target.value)} placeholder={punch.clock_in} /> <br />
                    <input name="clock_out" onChange={e => setClOut(e.target.value)} placeholder={punch.clock_out} /> <br />
                    <input type="submit" value="Upated Punch" onClick={handleSubmit} />
                    <input type="submit" value="Delete Punch" onClick={e=>handleDelete(e)} />
                </form>
            )
        } else {
            return <div className="loading"></div>
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        let punchUpdated = {
            id: match,
            clock_in: clockIn,
            clock_out: clockOut,
        }
        updatePunch(punchUpdated)
        setTimeout(() => history.push("/clients/"+punch.client_id), 2300)
    }

    function handleDelete(e) {
        e.preventDefault()
        let deletingPunch = {
            id: match,
            clock_in: clockIn,
            clock_out: clockOut
        }
        deletePunch(deletingPunch)
        setTimeout(() => history.push("/clients/"+punch.client_id), 2300)
    }
    return (
        <main>
            {displayPunchForm()}
        </main>
    )

}

export default connect(null, { updatePunch, deletePunch })(ClockEdit)