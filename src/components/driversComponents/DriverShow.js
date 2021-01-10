import { Link } from "react-router-dom"
const DriverShow = ({ drivers, history, match }) => {
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

    return (
        <div>
            <div>
                <h2>Clients:</h2> {displayDriver()}
            </div>
            <div>
                <Link to="/drivers">Back</Link> <Link to={`/drivers/${match}/edit`}>Edit Driver</Link>
            </div>

        </div>
    )
}

export default DriverShow