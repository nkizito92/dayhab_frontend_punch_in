import React from 'react'
import Client from './Client'
class Clients extends React.Component {
    render () {
        return (
            this.props.clients.map(client => {
            <div>
                <Client key={client.id} client={client} />
            </div>
            })
        )
    }
}

export default Clients