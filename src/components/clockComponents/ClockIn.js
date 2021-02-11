import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPunch, updatePunch } from '../../action/clockAction'
import Clock from './Clock'
class ClockIn extends Component {
    state = {
        full_name: "",
        error: "",
        update: "",
    }

    handlePunch = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        let newPunch = {
            full_name: this.state.full_name,
        }

        let checkFull_name = this.props.clients.find(client => client.full_name === this.state.full_name)

        if (checkFull_name !== undefined) {
            this.setState({
                client_id: "",
                clock_in: "",
                full_name: ""
            })
            this.props.createPunch(newPunch, this.props.statusMessage)
        }
        else {
            this.setState({
                full_name: ""
            })
            let message = {
                status: "",
                error: "Client Doesn't Exist!!"
            }
            this.props.statusMessage(message)
        }
    }
    redirect() {
        if (!this.props.isLoggedIn) {
            <>{this.props.history.push("/login")}</>
        }
    }
    time() {
        let localTime = new Date().toLocaleTimeString([], { timeStyle: 'short' })
        return localTime
    }
    render() {
        return (
            <div>
                <h1>Time Clock</h1>
                <Clock />
                <br />
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input name="full_name" type="text" onChange={e => this.handlePunch(e)} placeholder="Full Name" autoFocus /> <br />
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
                {this.redirect()}
            </div>
        )
    }
}

export default connect(null, { createPunch, updatePunch })(ClockIn)