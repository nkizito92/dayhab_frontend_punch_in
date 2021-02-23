import React, {Component} from 'react'
import ClockIn from "../components/clockComponents/ClockIn"
class ClockContainer extends Component {
    render() {
        return (
            <div>
                <ClockIn statusMessage={this.props.statusMessage} isLoggedIn={this.props.isLoggedIn} punchIn={this.props.punches} clients={this.props.clients} history={this.props.history} />
            </div>
        )
    }
}
export default ClockContainer