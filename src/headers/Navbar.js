import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ({ currentUser, isLoggedIn }) => {

    const link = {
        padding: "8px 10px",
        margin: "0 3px",
        color: "#ffff",
        textDecoration: 'none'
    }

    const usernameColor = {
        color: "orange",
        fontWeight: "600"
    }

    function displayOtherLinks() {
        if (isLoggedIn) {
            return (
                <>
                    <NavLink to="/clients/new" exact style={link} activeStyle={{ backgroundColor: "navy" }}>Create Client</NavLink>
                    <span id="account">  <NavLink to={`/users/${currentUser.id}`} exact style={link} activeStyle={{ backgroundColor: "navy" }}>Account</NavLink>
                    <NavLink to="/logout" exact style={link} activeStyle={{ backgroundColor: "navy" }}>Logout</NavLink> 
                    <span style={usernameColor}> {currentUser.username}</span> 
                    </span>
                </>
            )
        } else {
            return (
                <>
                    <NavLink to="/login" exact style={link} activeStyle={{ backgroundColor: "navy" }}>Login</NavLink>
                </>
            )
        }
    }
    // hide some nav links if not logged in
    return (
        <>
            <NavLink to="/" exact style={link} activeStyle={{ backgroundColor: "navy" }}>Home</NavLink>
            <NavLink to="/clients" exact style={link} activeStyle={{ backgroundColor: "navy" }}>Clients</NavLink>
            <NavLink to="/drivers" exact style={link} activeStyle={{ backgroundColor: "navy" }}>Drivers</NavLink>
            {displayOtherLinks()}
        </>
    )
}
export default Navbar