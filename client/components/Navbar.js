import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className = 'navbar'>
    <div className = 'wrapper'>
      <div className = 'logo'>
        <h1>Travel Tracker</h1>
        {/* <img src='world.png' alt=''/> */}
        {/* <h1>Tracker</h1> */}
      </div>
        <nav>
          {isLoggedIn ? (
            <div>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            null
          )}
        </nav>
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
