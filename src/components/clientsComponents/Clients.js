import React, { Component } from 'react'
import Client from './Client'
class Clients extends Component {

    display() {
        return this.props.clients.map(client => {
            return <Client key={client.id} client={client} />
        })
    }
    render() {
        return (
            <div>
                Hi
                <div>
                    <table border="1">
                        <th>Clients</th>
                        <tr><td>full_name</td><td>Pay Rate</td> <td>Total hours</td></tr>
                        {this.display()}
                    </table>
                </div>
            </div>
        )
    }
}

export default Clients