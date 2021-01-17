import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPunch, updatePunch } from '../../action/clockAction'
class ClockIn extends Component {

    state = {
        full_name: "",
        error: "",
        update: ""
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

        let flashUpdate = ""

        let checkFull_name = this.props.clients.find(client => client.full_name === this.state.full_name)

        if (checkFull_name !== undefined) {
            document.getElementById("success").className = "updated"
            let clients_punches = this.props.punchIn.filter(punch => this.state.full_name === punch.client.full_name).length + 1
    
            if (clients_punches % 2 === 0) {
                flashUpdate = "Clock Out"
                setTimeout(() => {
                    this.props.history.push("/clients")
                }, 3000);
            } else {
                flashUpdate = "Clock In"
                
            }
            this.setState({
                client_id: "",
                clock_in: "",
                update: `${this.state.full_name} ${flashUpdate}`, // client clock in or out
                full_name: ""
            })
            this.props.createPunch(newPunch)
        }
        else {
            document.getElementById("fail").className = "error"
            this.setState({
                error: "Client doesn't exist",
                full_name: ""
            })
        }
    }
     redirect ()  {
        if (!this.props.isLoggedIn) {
            <>{this.props.history.push("/login")}</>
        } 
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>PunchMachine</h3>
                    <input name="full_name" type="text" onChange={e => this.handlePunch(e)} value={this.state.full_name} />
                    <input onClick={this.handleSubmit} type="submit" />
                </form>
                <div id="success">{this.state.update}</div>
                <div id="fail">{this.state.error}</div>
                {this.redirect()}
            </div>
        )
    }
}

export default connect(null, { createPunch, updatePunch })(ClockIn)