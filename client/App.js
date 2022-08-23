import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import {connect} from 'react-redux'

const App = ({isLoggedIn}) => {
  return (
    <div className = 'app'>
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
  }
}

export default connect(mapState)(App)
