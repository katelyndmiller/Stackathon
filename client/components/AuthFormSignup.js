import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthFormSignup = props => {
  const {name, displayName, handleSubmit, error} = props
  
  return (
    <div className="login-signup-homepage">
      <h1 className="title">Travel Tracker</h1>
      <div id="signup" className = 'login-signup-container'>
        <form onSubmit={handleSubmit} name={name}>
        <div className = 'fields'>
            <input name="firstName" type="text" placeholder = 'First Name' />
            <input name="lastName" type="text" placeholder = 'Last Name'/>
            <input name="email" type="text" placeholder = 'Email'/>
            <input name="password" type="password" placeholder = 'Password'/>
            <button type="submit">{displayName}</button>
            <div className="login-link">
              <Link to="/login"><small>Login</small></Link>
            </div>
        </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(authenticate(email, password, formName, firstName, lastName))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(AuthFormSignup)