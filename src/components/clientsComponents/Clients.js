import React, { Component } from 'react'
import Client from './Client'
class Clients extends Component {
    state = {
        month: "January"
    }

    display(thesePunches) {
        if (thesePunches !== undefined && this.props !== undefined) {
            return this.props.clients.map(client => {
                return <tr key={`key${client.id}`}><Client key={`key${client.id}`} client={client} punches={thesePunches} month={this.state.month} /></tr>
            })
        } else {
            return <div className="loading"></div>
        }
    }

    clientsOftheMonth(mon) {
        let theMonth = []
        return this.props.punches.filter(punched => {
            if (mon === punched.date) {
                theMonth.push(punched)
            }
            return theMonth
        })
    }

    handleMonth(e) {
        this.setState({
            month: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({
            month: ""
        })
    }

    render() {
        return (
            <div>
                <h1>Clients</h1>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <select onChange={e => this.handleMonth(e)} >
                        <option>January</option>
                        <option>Feburary</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                    </select>
                </form>
                <table border="1">
                    <thead>
                        <tr>
                            <td>Full name</td>
                            <td>Pay Rate</td>
                            <td>Total hours</td>
                            <td>Money Earned</td>
                        </tr>
                    </thead>
                    <tbody>

                        {this.display(this.clientsOftheMonth(this.state.month))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Clients