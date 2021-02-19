const Logout = ({handleLogout, history, user}) => {
    setTimeout(() => {
        handleLogout()
        history.push("/clients")         
    }, 2300)
    return (
        <div className="updated">
             {user.username} is Logging Out
        </div>
    )
}

export default Logout