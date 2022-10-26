import React, {useState} from 'react';
import SearchBar from "./SearchBar";
import GeolocationBtn from "./GeolocationBtn";
import Toggle from './ToggleSwitch';

export default function SideBar({ firstName, handleClick, panTo, toggled, setToggled }) {

    return (
        <div className = 'mapright'>
            <h1>Hi, {firstName}</h1>
            <p>Keep track of all of the awesome places you've traveled! Simply click the location on the map to add a pin. You may utilize the search bar or geolocation below to find a location.</p>
            <SearchBar panTo={panTo}/>
            <GeolocationBtn panTo={panTo} />
            <Toggle onChange={(event) => setToggled(event.target.checked)} toggled={toggled}/>
            <p className='toggle-lbl'>{toggled ? 'All users pins': 'My pins only'}</p>
            <a className="logout-btn" href="#" onClick={handleClick}>Logout</a>
      </div>
    )
}