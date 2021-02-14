import { Link } from "react-router-dom"
import { useState } from "react"
const ClientShow = ({ clients, punches, match, isLoggedIn }) => {
    const [month, setMonth] = useState(new Date().toDateString().slice(4, 7))
    const client = clients.find(client => client.id === match)
    // match todays date with each punches date
    // change the date to pull up specific dates punches 
    // display total hours for the month
    function displayLocalTime(mins) {
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

    let displayEditClient = () => {
        if (isLoggedIn) {
            return (
                <div>
                    <Link to={`/clients/${client.id}/edit`}>Edit Client</Link>
                </div>
            )
        }
    }

    let displayPunches = () => {
        if (client !== undefined) {
            const thesePunches = punches.filter(punch => punch.client_id === client.id)
            return thesePunches.map(punch => {
                if (punch.month_day.slice(0, 3) === month) {
                    if (punch.clock_in !== null) {
                        return (
                            <div key={punch.id}>
                                <h2>{punch.month_day}</h2>
                                {punch.month_day} Clocked In {displayLocalTime(punch.clock_in)}
                            </div>
                        )
                    } else {
                        return (
                            <div key={punch.id}> {punch.month_day} Clocked Out {displayLocalTime(punch.clock_out)}</div>
                        )
                    }
                } else {
                    return ( 
                        <div>
                            Select a Month to see Time marks.
                        </div>
                    )
                }
            })
        }
    }

    let displayClient = () => {
        if (client !== undefined) {
            return (
                <>
                    <h1> {client.full_name} </h1>
                    <h2>PayRate: ${client.pay_rate}</h2>
                    <h3>Driver: {client.driver.first_name} {client.driver.last_name}</h3>
                    <div>
                        <Link to="/clients">Go Back</Link>
                    </div>
                </>
            )
        } else {
            return <div className="loading"></div>
        }

    }

    return (
        <div>

            <select onChange={e => {
                if (e.target.value === null) {
                    setMonth(new Date().toDateString().slice(4, 7))
                } else {
                    setMonth(e.target.value)
                }
            }}>
                <option>Select Month</option>
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
                <option>Apr</option>
                <option>May</option>
                <option>Jun</option>
                <option>Jul</option>
                <option>Aug</option>
                <option>Oct</option>
                <option>Sep</option>
                <option>Nov</option>
                <option>Dec</option>
            </select>

            {displayClient()}
            {displayEditClient()}
            <div>{displayPunches()}</div>
        </div>
    )

}

export default ClientShow
