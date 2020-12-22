import React, {Component} from 'react'
import ClockIn from '../components/ClockIn'
class ClockContainer extends Component {
    render() {
        console.log(this.props.punchIns)
        return (
            <div>
                <ClockIn punchIn={this.props.punches} />
            </div>
        )
    }
}

export default ClockContainer