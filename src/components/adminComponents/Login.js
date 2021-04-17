import React, { useState } from 'react'
import { goLogin } from '../../action/userAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Login = ({ handleLogin, statusMessage, history, isLoggedInNow, users }) => {
    const [username, setUname] = useState()
    const [password, setPass] = useState()
    const [flash, setFlash] = useState()
    let handleSubmit = e => {
        function createAnElement(message) {
            let ele = document.createElement('div')
            ele.className = "error"
            ele.innerHTML = message
            let failEle = document.getElementById("fail")
            failEle.appendChild(ele)
            setTimeout(() => failEle.removeChild(ele), 2000)
        }
        e.preventDefault()
        let logging = {
            username: username,
            password: password
        }
        let users_nameMatch = users.find(userN => userN.username === username)
        if (users_nameMatch && password) {
            document.querySelector("#success").className = "updated"
            goLogin(logging, handleLogin, statusMessage)
            setFlash(`Processing login..`)
        } else if (!username && !password) {
            createAnElement("Please fill all fields")
        } else if (!username) {
            createAnElement("Username wasn't entered")
        } else if (!password) {
            createAnElement("Password wasn't entered")
        } else {
            createAnElement("No such user exsit try again")
        }
    }

    let redirect = () => {
        if (isLoggedInNow) {
            <>{history.push("/clients")}</>
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input placeholder="username" type="text" name="username" autoFocus
                    onChange={e => setUname(e.target.value.toLowerCase())}
                /> <br />
                <input placeholder="password" type="password" name="password"
                    onChange={e => setPass(e.target.value)}
                /> <br />
                <button placeholder="submit" type="submit" onClick={handleSubmit}>Log In</button>
                <div>
                    <Link className="link" to='/signup'>sign up</Link>
                </div>
            </form>
            <br />
            <div id="fail"></div>
            <div id="success">{flash}</div>
            {redirect()}
        </div>
    )
}

export default connect(null, { goLogin })(Login)