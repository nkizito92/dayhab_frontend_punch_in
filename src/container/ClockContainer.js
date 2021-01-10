import React, {Component} from 'react'
import ClockIn from "../components/clockComponents/ClockIn"
class ClockContainer extends Component {
    render() {
        return (
            <div>
                <ClockIn punchIn={this.props.punches} clients={this.props.clients} />
            </div>
        )
    }
}
export default ClockContainer