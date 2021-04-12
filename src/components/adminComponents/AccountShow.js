import { Link } from 'react-router-dom'

const AccountShow = ({ match, history, users, isLoggedIn, userImage }) => {
    const user = users.find(user => user.id === Number(parseInt(match.params.id)))
    const image = userImage.filter(image => image.user_id === user.id)
    let displayUser = () => {
        if (user) {
            return (
                <>
                    <h1>{user.username}'s Account</h1>
                    <div>{displayPicForm()}</div>
                    <h2>Drivers {user.drivers.length}</h2>
                </>
            )
        }
    }

    const displayPicForm = () => {
        if (!image[0]) {
            return <Link to={`/users/${match.params.id}/photoedit`}> Add Profile Picture</Link>
        } else {
            return <img className="userPhoto" alt="Admins Pic" src={image[0].image_element.url} />
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
            <Link className="button" to={`/users/${match.params.id}/edit`}>Account Settings</Link>
        </>
    )
}
export default (AccountShow)