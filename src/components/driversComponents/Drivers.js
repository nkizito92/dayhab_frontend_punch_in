import Driver from "./Driver"
import { Link } from "react-router-dom"

const Drivers = ({ drivers }) => {
    let display = () => {
        return drivers.map(driver => {
          return <Driver key={driver.id} driver={driver} />
        })
    }
    return (
        <div>
            {display()}
            <div>
                <Link to="/drivers/new" >Create Driver</Link>
            </div>
        </div>
    )
}

export default Drivers