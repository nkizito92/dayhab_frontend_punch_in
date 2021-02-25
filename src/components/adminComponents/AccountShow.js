import { Link } from 'react-router-dom'

const AccountShow = ({ match, history, users, isLoggedIn }) => {
    const user = users.find(user => user.id === Number(parseInt(match.params.id)))
    let displayUser = () => {
        if (user) {
            return (
                <>
                    <h1>{user.username}'s Account</h1>
                    <h2>Drivers {user.drivers.length}</h2>
                </>
            )
        }
    }

    let redirect = () => {
        if (!isLoggedIn) {
            <>{history.push("/login")}</>
        }
    }
    return (
        <>
            {displayUser()}
            {redirect()}
            <Link to={`/users/${match.params.id}/edit`}>Account Settings</Link>
        </>
    )
}
export default (AccountShow)