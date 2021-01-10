import { Link } from "react-router-dom"
const ClientShow = ({ clients, punches, match }) => {
    // match todays date with each punches date
    // change the date to pull up specific dates punches 
    // display total hours for the month
    const client = clients.find(client => client.id === match)

    let displayPunches = () => {
        if(client !== undefined){
            const thesePunches = punches.filter(punch => punch.client_id === client.id)
       return thesePunches.map(punch => {
           if(punch.clock_in !== null){
            return (
                <div key={punch.id}>
                    <h2>{punch.date}</h2>
                    {punch.clock_in} clockIn
                </div>
            )} else {
                return (
                    <div key={punch.id}>{punch.clock_out} clockOut</div>
                )
            }
        })} 
    }
    let displayClient = () => {
        if (client !== undefined) {
            return (
                <>
                    <h1> {client.full_name} </h1>
                    <h2>PayRate: ${client.pay_rate}</h2>
                    <div>
                        <Link to={`/clients/${client.id}/edit`}>Edit Client</Link>
                    </div>
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
            <div>{displayPunches()}</div>
        </div>
    )

}

export default ClientShow
