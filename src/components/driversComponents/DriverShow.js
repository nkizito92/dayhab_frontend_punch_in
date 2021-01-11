import { Link } from "react-router-dom"
const DriverShow = ({ drivers, history, match, isLoggedInNow }) => {
    let driver = drivers.find(driver => driver.id === match)
    let displayDriver = () => {
        if (driver !== undefined) {
            let clients = driver.clients.map(client => {
                return (
                    <div key={client.id}>
                        {client.full_name}
                    </div>
                )
            })
            return (
                <>
                    <h1> {driver.first_name} {driver.last_name}</h1>
                    <div> {clients}</div>
                </>
            )

        } else {
            return (
                <div className="loading"></div>
            )
        }
    }

    let displayEditLink = () => {
        if (isLoggedInNow) {
            return (
                <div>
                    <Link to="/drivers">Back</Link> <Link to={`/drivers/${match}/edit`}>Edit Driver</Link>
                </div>
            )
        } 
    }

    return (
        <div>
            <div>
                <h2>Clients:</h2> {displayDriver()}
            </div>
            {displayEditLink()}
        </div>
    )
}

export default DriverShow