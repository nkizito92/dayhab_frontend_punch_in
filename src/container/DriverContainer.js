import Drivers from '../components/driversComponents/Drivers'

const DriverContainer = ({drivers, isLoggedInNow}) => {

    return (
        <div> 
            <Drivers drivers={drivers} isLoggedIn={isLoggedInNow} />
        </div>
    )
}

export default DriverContainer