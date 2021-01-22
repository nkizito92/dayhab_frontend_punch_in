import { Link } from "react-router-dom"
const Driver = ({driver}) => {
    return (
        <div>
            <h1>{driver.first_name} {driver.last_name}</h1>
            <h2>Clients: {driver.clients.length}</h2>
            <Link to={"drivers/"+driver.id} >View Driver </Link>
        </div>
    )
}

export default Driver