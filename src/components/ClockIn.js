import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPunch } from '../action/clockAction'

class ClockIn extends Component {

    state = {
        full_name: "",
        error: "",
        update: ""
    }

    // clientsData() {
    //     // find client and his punches first 
    //     let punch_ins = this.props.punchIn.map(punched => {
    //         if (punched !== undefined) {
    //             if (punched.clock_in) {
    //                 return (
    //                     <div>
    //                         {punched.client.full_name} {punched.clock_in} clock in
    //                     </div>
    //                 )
    //             } else if (punched.clock_out) {
    //                 return (
    //                     <div>{punched.client.full_name} {punched.clock_out} clock out</div>
    //                 )
    //             }

    //         } else {
    //             return (
    //                 <div>Loading...</div>
    //             )
    //         }
    //     })
    //     return (
    //         <div>
    //             {punch_ins}
    //         </div>
    //     )
    // }
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

        let flashUpdate = ""

        let checkFull_name = this.props.clients.find(client => client.full_name === this.state.full_name)

        if (checkFull_name !== undefined) {
            document.getElementById("success").className = "updated"
            let clients_punches = this.props.punchIn.filter(punch => this.state.full_name === punch.client.full_name).length + 1
            if (clients_punches % 2 === 0) {
                flashUpdate = "Clock Out"
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

        // find client and his punches first 

    }

    render() {
        return (
            <div>

                {/* {this.clientsData()} */}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <h3>PunchMachine</h3>
                    <input name="full_name" type="text" onChange={e => this.handlePunch(e)} value={this.state.full_name} />
                    <input onClick={this.handleSubmit} type="submit" />
                </form>
                <div id="success">{this.state.update}</div>
                <div id="fail">{this.state.error}</div>
            </div>
        )
    }
}

export default connect(null, { createPunch })(ClockIn)