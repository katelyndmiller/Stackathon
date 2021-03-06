import React from 'react'
import {connect} from 'react-redux'
import Map from "../components/Map";


export const Home = props => {
  const {firstName} = props

  return (
    <div>
        <Map firstName={firstName}/>
    </div>
  )
}

const mapState = state => {
  return {
    firstName: state.auth.firstName
  }
}

export default connect(mapState)(Home)
