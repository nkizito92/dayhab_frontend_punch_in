import React, { Component } from 'react'
import Client from './Client'
import ClientList from './ClientList'
import { Link } from 'react-router-dom'
class Clients extends Component {
    componentDidMount() {
        this.setState({
            month: new Date().toLocaleDateString('default', { month: 'long' })
        })
    }
    state = {
        month: "",
        inputValue: ""
    }

    display(thesePunches) {
        if (thesePunches !== undefined && this.props !== undefined) {
            let usersClients = this.props.clients.filter(client => client.driver.user_id === this.props.current_user)
            if (!this.props.current_user) {
                return this.props.clients.slice(0, 4).map(client => {
                    return <tr key={`key${client.id}`}><Client className="client" key={`key${client.id}`} client={client} punches={thesePunches} month={this.state.month} /></tr>
                })
            }
            else {
                return usersClients.map(client => {
                    return <tr key={`key${client.id}`}><Client className="client" key={`key${client.id}`} client={client} punches={thesePunches} month={this.state.month} /></tr>
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

    displayLink() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <br />
                    <Link className="link" to="/clockin">Go To Time Clock</Link>
                </div>
            )
        }
    }
    goToClientpage(e) {
        this.setState({
            inputValue: e.target.value
        })
        let thisClient = this.props.clients.find(client => this.state.inputValue.toLowerCase() === client.full_name.toLowerCase())
        if (thisClient) {
            this.props.history.push(`/clients/${thisClient.id}`)
        } else {
            return
        }
    }

    displayListOfClients(e) {
        this.setState({
            inputValue: e.target.value
        })
        let theseClients = this.props.clients.filter(client => this.state.inputValue.includes(client.full_name.slice(0, 3).toLowerCase()))
        console.log(theseClients)
    }

    displayList() {
        let theseClients = this.props.clients.filter(client => this.state.inputValue.includes(client.full_name.slice(0, 3).toLowerCase()))
        if (theseClients !== undefined) {
            return theseClients.map(client => {
                return <div><ClientList key={`key-${client.id}`} client={client} /></div>
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.goToClientpage}>
                    <div>
                        <input onChange={(e) => this.displayListOfClients(e)} value={this.state.inputValue.toLowerCase()} type="search" placeholder="Search..." />
                        <div className="clientsList">{this.displayList()}</div>
                    </div>
                    <input type="submit" onClick={(e) => this.goToClientpage(e)} value="Search Name" />
                </form>
                <h1>Clients</h1>
                <select onChange={e => this.handleMonth(e)}>
                    <option hidden>{this.state.month}</option>
                    <option>January</option>
                    <option>February</option>
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
                <table>
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
            </div >
        )
    }
}

export default Clients