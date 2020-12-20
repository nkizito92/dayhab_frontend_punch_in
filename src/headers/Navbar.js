import React from 'react'
import { NavLink } from 'react-router-dom';

const link = {
    padding: "8px 10px",
    margin: "0 3px",
    color: "#ffff",
    textDecoration: 'none'
}

 const Navbar = () => (
    <>
        <NavLink to="/" exact style={link} activeStyle={{ backgroundColor: "navy" }}>Home</NavLink>
        <NavLink to="/clients" exact style={link} activeStyle={{ backgroundColor: "navy" }}>Clients</NavLink>
    </>
)
export default Navbar