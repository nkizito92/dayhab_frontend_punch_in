import Driver from "./Driver"
import { Link } from "react-router-dom"

const Drivers = ({ drivers, isLoggedIn, current_user, clients }) => {
    let display = () => {
        if(current_user){
        let usersDrivers = drivers.filter(driver => driver.user_id === current_user) 
        return usersDrivers.map(driver => {
          return <Driver key={driver.id} driver={driver} clients={clients}/>
        })} else {
            return <div><Link to="/login">Login</Link> to see Drivers </div>
        }
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