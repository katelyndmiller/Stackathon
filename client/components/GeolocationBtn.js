import React from 'react';

export default function GeolocationBtn({panTo}) {
    return (
      <button className="geolocate-btn" onClick = {() => {
        navigator.geolocation.getCurrentPosition((position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        }, () => null)
      }}>
        <img src='compass.png' alt='compass - locate me' className='geolocation-img' />
      </button>
    ) 
  }