import React from 'react'
import {connect} from 'react-redux'
import Map from "../components/Map";


export const Home = props => {
  const {firstName} = props

  return (
    <div>
      <div className = 'greeting'>
        <h3>Hi, {firstName}!</h3>
      </div>
      <div>
        <Map />
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    firstName: state.auth.firstName
  }
}

export default connect(mapState)(Home)
