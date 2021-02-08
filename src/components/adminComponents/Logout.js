const Logout = ({handleLogout, history, user}) => {
    setTimeout(() => {
        handleLogout()
        history.push("/clients")         
    }, 2300)
    return (
        <div>
            <h1> {user.username} is Logging Out</h1>
        </div>
    )
}

export default Logout