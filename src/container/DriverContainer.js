import Drivers from '../components/driversComponents/Drivers'

const DriverContainer = ({drivers, isLoggedInNow, current_user, clients}) => {

    return (
        <div> 
            <Drivers current_user={current_user} drivers={drivers} isLoggedIn={isLoggedInNow} clients={clients} />
        </div>
    )
}

export default DriverContainer