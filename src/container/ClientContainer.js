import React from 'react'
import Clients from '../components/clientsComponents/Clients'
class ClientContainer extends React.Component {
    render () {
    return (
        <div>
            <Clients current_user={this.props.current_user} clients={this.props.clients} punches={this.props.punches} isLoggedIn={this.props.isLoggedIn}/>
        </div>
    )
}
}

export default ClientContainer