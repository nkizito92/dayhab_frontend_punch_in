import { updateUser } from "../../action/adminAction"
import { useState } from 'react'
import { connect } from 'react-redux'

const AccountEdit = ({ statusMessage, users, match, history, isLoggedIn }) => {
    const user = users.find(user => user.id === Number(parseInt(match.params.id)))
    const [userName, setUserName] = useState(user.username)
    const [currentPassword, setCurPass] = useState()
    const [password, setPass] = useState()
    const [passwordConfirmation, setPassCon] = useState()

    let handleSubmit = e => {
        e.preventDefault()
        let editedUser = {
            id: Number(parseInt(match.params.id)),
            username: userName,
            currentPassword: currentPassword,
            password: password,
            password_confirmation: passwordConfirmation
        }
        updateUser(statusMessage, editedUser)
    }

    let displayForm = () => {
        if (user) {
            return (
                <>
                    <h1>
                        {user.username} Account Settings
                    </h1>
                    <form onSubmit={e => handleSubmit(e)}>
                        <input type="text" name="username" value={userName} onChange={e => setUserName(e.target.value)} />
                        <input type="password" name="password" placeholder="Current password" onChange={e => setCurPass(e.target.value)} />
                        <input type="password" name="password" placeholder="New password" onChange={e => setPass(e.target.value)} />
                        <input type="password" name="password_confirmation" placeholder="Password Confirmation" onChange={e => setPassCon(e.target.value)} />
                        <button type="submit" onClick={handleSubmit}>Update Account</button>
                    </form>
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
            {displayForm()}
            {redirect()}
        </>
    )
}

export default connect(null, { updateUser })(AccountEdit)