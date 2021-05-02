import { Link } from 'react-router-dom'
const Home = ( {isLoggedIn}) => {
    let displayLinks = () => {
        if (isLoggedIn) {
            
            return ( <>
            <br />
            <Link className="link" to="/clockin">Go To Time Clock</Link> </>
)
        } else {
            return (
                <>
                <div>
                <br/>
                <Link className="button" to="/login">Login</Link>
                <br/>
                <br/>
                    <Link className="link" to="/Signup">Signup</Link>
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