import React, { Component } from 'react'

class ClientShow extends Component {

    // match todays date with each punches date
    // change the date to pull up specific dates punches 
    // display total hours for the month
    displayClient() {
        const client = this.props.clients.find(client => client.id === this.props.match)
        if (client !== undefined) {
            console.log(client.punches)
            return (
                <>
                    <h1> {client.full_name} </h1>
                    <div>{client.punches[0].clock_in}</div>
                </>
            )
        } else {
            return <>Loading</>
        }
        

        
    }
    render() {
        return (
            <div>
                {this.displayClient()}
            </div>
        )
    }
}

export default ClientShow
