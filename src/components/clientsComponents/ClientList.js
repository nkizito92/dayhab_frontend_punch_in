import { Link } from 'react-router-dom'
const ClientList = ({ client }) => {
    let thisClient = 0
    if (client) thisClient = client
    return (
        <div>
            <Link to={`/clients/${thisClient.id}`}>{thisClient.full_name}</Link>
        </div>
    )
}
export default ClientList