import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import {Link} from 'react-router-dom'

const AuthFormLogin = props => {
  const {name, displayName, handleSubmit, error} = props
  
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        <div>
          <Link to="/signup" style={{"color": "darkblue"}}><small>Don't have an account? Signup.</small></Link>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
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
