import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPunch } from '../action/clockAction'

class ClockIn extends Component {

    state = {
        full_name: "",
        error: "",
        update: ""
    }

    clientsData() {
        // find client and his punches first 
        let punch_ins = this.props.punchIn.map(punched => {
            if (punched !== undefined) {
                return (
                    <div>
                        {punched.clock_in} clock in
                    </div>
                )
            } else {
                return (
                    <div>Loading...</div>
                )
            }
        })
        return (
            <div>
                {punch_ins}
            </div>
        )
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
        // if clock_in already today then clock_out
        this.props.createPunch(newPunch)
        let color = document.getElementById("flashing")
        if (this.state.full_name) {
            color.className = "updated"
        }
        else {
            color.className = "error"
        }
        let flashUpdate = ""
        // find client and his punches first 
        let clients_punches = this.props.punchIn.filter(punch => this.state.full_name === punch.client.full_name)
        if (clients_punches.length === 0) clients_punches = 1
        if (clients_punches.length % 2 === 0) {
            flashUpdate = "Clock Out"
        }
        else {
            flashUpdate = "Clock In"
        }
        this.setState({
            client_id: "",
            clock_in: "",
            error: "Client doesn't exist",
            update: `${this.state.full_name} ${flashUpdate}`, // client clock in or out
            full_name: ""
        })
    }

    render() {
        console.log(this.props.punchIn)
        return (
            <div>
                <div id="flashing">{this.state.update}</div>
                Hi there!!!
                {this.clientsData()}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>PunchMachine</h3>
                    <input name="full_name" type="text" onChange={e => this.handlePunch(e)} />
                    <input onClick={this.handleSubmit} type="submit" />
                </form>
            </div>
        )
    }
}

export default connect(null, { createPunch })(ClockIn)