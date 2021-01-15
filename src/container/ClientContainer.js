import React from 'react'
import Clients from '../components/clientsComponents/Clients'
class ClientContainer extends React.Component {
    render () {
    return (
        <div>
            <Clients clients={this.props.clients} punches={this.props.punches} isLoggedIn={this.props.isloggedInNow}/>
        </div>
    )
}
}

export default ClientContainer