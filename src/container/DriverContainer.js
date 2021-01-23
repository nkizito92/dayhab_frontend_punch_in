import Drivers from '../components/driversComponents/Drivers'

const DriverContainer = ({drivers, isLoggedInNow, current_user}) => {

    return (
        <div> 
            <Drivers current_user={current_user} drivers={drivers} isLoggedIn={isLoggedInNow} />
        </div>
    )
}

export default DriverContainer