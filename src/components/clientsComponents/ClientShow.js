import { Link } from "react-router-dom"
import { useState } from "react"
const ClientShow = ({ clients, punches, match, isLoggedIn }) => {
    const [month, setMonth] = useState(new Date().toLocaleDateString('default', { month: 'long' }))
    const client = clients.find(client => client.id === match)

    let time = []
    let theseClientPunches = punches.filter(punch => punch.client_id === client.id)
    let clockOuts = (clockingOut = []) => {
        for (let i = 0; i < theseClientPunches.length; i++) {
            if (i % 2 !== 0 && theseClientPunches[i].date === month) clockingOut.push(theseClientPunches[i])
        }
        const unique = [...new Map(clockingOut.map(cOut => [cOut.id, cOut])).values()]
        return unique
    }

    let clockIns = (clockingIn = []) => {
        for (let i = 0; i < theseClientPunches.length; i++) {
            if (i % 2 === 0 && theseClientPunches[i].date === month) clockingIn.push(theseClientPunches[i])
        }
        const unique = [...new Map(clockingIn.map(cIn => [cIn.id, cIn])).values()]
        return unique
    }

    let convertHoursToMinutes = times => {
        let hours = []
        let minutes = []
        let calculatingMinutes
        if (times) {
            for (let i = 0; i < clockOuts().length; i++) {
                hours.push(Number(parseInt(times.split("").slice(0, 2).join(""))))
                minutes.push(Number(parseInt(times.split("").slice(2, 4).join(""))))
                calculatingMinutes = (hours[i] * 60) + minutes[i]
            }
        }
        return calculatingMinutes
    }
    let totalMinutes = () => {
        for (let i = 0; i < clockOuts().length; i++) {
            if (clockOuts().length === clockIns().length)
                time.push(
                    (convertHoursToMinutes(clockOuts()[i].clock_out))
                    - (convertHoursToMinutes(clockIns()[i].clock_in))
                )
        }
        return time
    }
    function displayAllMinutes() {
        let showAllMinutes = 0;
        for (let minutes of totalMinutes()) {
            showAllMinutes = minutes + showAllMinutes
        }
        let hours = Math.floor(showAllMinutes / 60);
        let minutes = showAllMinutes % 60;
        if (minutes < 10) minutes = (`0${minutes}`)
        if (hours < 1) hours = 0
        return `${hours}:${minutes}`
    }
    function setPayment(pay, hr) {
        return (pay * (hr / 5.00)).toFixed(2)
    }
    let time_convert = (num, newNumb = []) => {
        for (let i = 0; i < num.length / 2; i++) newNumb.push(num[i])
        let allMinutes = 0
        if (newNumb[1] !== "") {
            for (let ele of newNumb) if (ele !== undefined) allMinutes += ele
        } else {
            allMinutes = newNumb
        }
        let hours = Math.floor(allMinutes / 60);
        return (
            setPayment(client.pay_rate, hours)
        )
    }

    //  displayLocal Time
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
                if (punch.date === month) {
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
                    return null
                }
            })
        }
    }

    let displayClient = () => {
        if (client !== undefined) {
            return (
                <div className="profile">
                    <h1> {client.full_name} </h1>
                    <h2>Driver: {client.driver.first_name} {client.driver.last_name}</h2>
                    <h2>PayRate: ${client.pay_rate}</h2>
                    <h3>SPA Hours: {displayAllMinutes()}</h3>
                    <h4>Money Earned: ${time_convert(totalMinutes())}</h4>
                    <div className="backLink">
                        <Link to="/clients">Go Back</Link>
                    </div>
                </div>
            )
        } else {
            return <div className="loading"></div>
        }

    }

    return (
        <div>

            <select onChange={e => {
                if (e.target.value === null) {
                    setMonth(new Date().toLocaleDateString('default', { month: 'long' }))
                } else {
                    setMonth(e.target.value)
                }
            }}>
                <option hidden>{month}</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
            </select>

            {displayClient()}
            {displayEditClient()}
            <div>{displayPunches()}</div>
        </div>
    )

}

export default ClientShow
