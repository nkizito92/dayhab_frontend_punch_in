import React, { useState } from 'react'
import { connect } from 'react-redux'
import { goSignup } from '../../action/adminAction'
const Signup = ({ history, handleLogin }) => {
    const [username, setUname] = useState()
    const [password, setPass] = useState()
    const [password_confirmation, setPassCon] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        let signUpUser = {
            username: username,
            password: password,
            password_confirmation: password_confirmation
        }
        goSignup(signUpUser, handleLogin, history)

    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    placeholder="username"
                    type="text"
                    name="username"
                    onChange={e => setUname(e.target.value)}
                /> <br />
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={e => setPass(e.target.value)}
                /> <br />
                <input
                    placeholder="password confirmation"
                    type="password"
                    name="password_confirmation"
                    onChange={e => setPassCon(e.target.value)}
                /> <br />
                <button placeholder="submit" type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

export default connect(null, { goSignup })(Signup)