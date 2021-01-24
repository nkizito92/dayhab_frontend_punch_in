import React, { Component } from 'react'
import Client from './Client'
import { Link } from 'react-router-dom'
class Clients extends Component {
    state = {
        month: "January"
    }

    display(thesePunches) {
        if (thesePunches !== undefined && this.props !== undefined) {
            let usersClients = this.props.clients.filter(client => client.driver.user_id === this.props.current_user)
            if (!this.props.current_user) {
                return this.props.clients.slice(0, 4).map(client => {
                    return <tr key={`key${client.id}`}><Client key={`key${client.id}`} client={client} punches={thesePunches} month={this.state.month} /></tr>
                })
            }
            else {
                return usersClients.map(client => {
                    return <tr key={`key${client.id}`}><Client key={`key${client.id}`} client={client} punches={thesePunches} month={this.state.month} /></tr>
                })
            }
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

    displayLink() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <Link to="/clockin">Go To PunchMachine</Link>
                </div>
            )
        }
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

                {this.displayLink()}
            </div>
        )
    }
}

export default Clients