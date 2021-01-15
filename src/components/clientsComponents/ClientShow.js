import { Link } from "react-router-dom"
const ClientShow = ({ clients, punches, match, isLoggedIn }) => {
    // match todays date with each punches date
    // change the date to pull up specific dates punches 
    // display total hours for the month
    const client = clients.find(client => client.id === match)

    function displayLocalTime(mins) {
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
                if (punch.clock_in !== null) {
                    return (
                        <div key={punch.id}>
                            <h2>{punch.date}</h2>
                            {punch.month_day} Clocked In {displayLocalTime(punch.clock_in)}
                        </div>
                    )
                } else {
                    return (
                        <div key={punch.id}> {punch.month_day} Clocked Out {displayLocalTime(punch.clock_out)}</div>
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
            {displayClient()}
            {displayEditClient()}
            <div>{displayPunches()}</div>
        </div>
    )

}

export default ClientShow
