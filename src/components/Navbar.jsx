import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to='/' className='navbar-link'><h1>LOGO</h1></Link>
      </div>

      <div className="nav-menu">
        <NavLink className='nav-links' style={({ isActive }) => ({ background: isActive ? '#b52685' : undefined})} to='/'>
          <p>Home</p>
        </NavLink>
        <NavLink className='nav-links' style={({ isActive }) => ({ background: isActive ? '#b52685' : undefined})} to='/about'>
          <p>About</p>
        </NavLink>
        <NavLink className='nav-links' style={({ isActive }) => ({ background: isActive ? '#b52685' : undefined})} to='/favourite'>
          <p>Favourite</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar