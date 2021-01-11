import React, { useState } from 'react'
import {goLogin} from '../../action/adminAction'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
const Login = ({ handleLogin, history, isLoggedInNow }) => {
    const [username, setUname] = useState()
    const [password, setPass] = useState()

    let handleSubmit = e => {
        e.preventDefault()
        let logging = {
            username: username,
            password: password
        }
        goLogin(logging, handleLogin, history)
    }
    console.log("is it ready",isLoggedInNow)

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input placeholder="username" type="text" name="username"
                    onChange={e => setUname(e.target.value)}
                /> <br />
                <input placeholder="password" type="password" name="password"
                    onChange={e => setPass(e.target.value)}
                /> <br />
                <button placeholder="submit" type="submit" onClick={handleSubmit}>Log In</button>
                <div>
                    or <Link to='/signup'>sign up</Link>
                </div>

            </form>
        </div>
    )
}

export default connect(null, { goLogin })(Login)