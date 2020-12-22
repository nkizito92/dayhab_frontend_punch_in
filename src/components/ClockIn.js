import React, { Component } from 'react'

class ClockIn extends Component {

    state = {
        id: 0,
        error: "",
        update: ""
    }

    clientsData () {
       let punch_ins = this.props.punchIn.map(punched => {
         return (  
            <div id={punched.id}>
                {punched.clock_in}
            </div>
         )
        })
        return (
            <div>
                {punch_ins}
            </div>
        )
    }

    render() {
        console.log(this.props.punchIn)
        return (
            <div>
                Hi there!!!
                {this.clientsData()}
            </div>
        )
    }
}

export default ClockIn