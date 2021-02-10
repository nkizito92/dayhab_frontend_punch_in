import { Link } from "react-router-dom"
const Driver = ({driver, clients}) => {
    let driversClients = clients.filter(client => driver.id === client.driver_id)
    return (
        <div>
            <h1>{driver.first_name} {driver.last_name}</h1>
            <h2>Clients: {driversClients.length}</h2>
            <Link to={"drivers/"+driver.id} >View Driver </Link>
        </div>
    )
}

export default Driver