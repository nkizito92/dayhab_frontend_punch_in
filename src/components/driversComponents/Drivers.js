import Driver from "./Driver"
import { Link } from "react-router-dom"

const Drivers = ({ drivers, isLoggedIn }) => {
    let display = () => {
        return drivers.map(driver => {
          return <Driver key={driver.id} driver={driver} />
        })
    }
    let displayCreateLink = () => {
        if(isLoggedIn){
        return (
            <div>
                <Link to="/drivers/new" >Create Driver</Link>
            </div>
        )}
    }
    return (
        <div>
            {display()}
            {displayCreateLink()}
        </div>
    )
}

export default Drivers