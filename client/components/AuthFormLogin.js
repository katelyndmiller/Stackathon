import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import {Link} from 'react-router-dom'

const AuthFormLogin = props => {
  const {name, displayName, handleSubmit, error} = props
  
  return (
    <div className="login-signup-homepage">
      <h1 className="title">Travel Tracker.</h1>
      {/* <img src='world.png' alt=''/> */}
      <div className = 'login-signup-container'>
        <form onSubmit={handleSubmit} name={name}>
          <div className="fields">
            <input name="email" type="text" placeholder='Email'/>
            <input name="password" type="password" placeholder='Password'/>
            <button type="submit">{displayName}</button>
          </div>
          <div className="signup-link">
            <Link to="/signup"><small>Don't have an account? Signup.</small></Link>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
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
      dispatch(authenticate(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthFormLogin)
