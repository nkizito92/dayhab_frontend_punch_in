import { Link } from 'react-router-dom'
const Home = () => {

    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/login">Login</Link>
            <div>

                <Link to="/Signup">Signup</Link>
            </div>
        </div>
    )
}

export default Home