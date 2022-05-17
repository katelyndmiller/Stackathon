import React from 'react';

const Toggle = ({onChange, toggled}) => {
    return (
        <label className='toggle-wrapper'>
            <input className='toggle-input' type='checkbox' onChange={onChange} />
            <span className={toggled ? 'toggle-slider-true' : 'toggle-slider-false'}/>
        </label>
    )
}

export default Toggle;