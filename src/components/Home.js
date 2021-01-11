import { Link } from 'react-router-dom'
const Home = ( {isLoggedIn}) => {
    let displayLinks = () => {
        if (isLoggedIn) {
            return (
                <Link to="/clockin">Go To PunchMachine</Link>
            )
        } else {
            return (
                <>
                <Link to="/login">Login</Link>
                <div>
                    <Link to="/Signup">Signup</Link>
                </div>
                </>
            )
        }
    }
    return (
        <div>
            <h1>Home Page</h1>
            {displayLinks()}
        </div>
    )

}

export default Home