import React, { useState, useRef } from 'react';

export default function AddNewPinPopupBox ({latitude, longitude, userId, setPin, setPopupIsOpen}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const form = useRef()

    const pin = {
        userId,
        latitude,
        longitude,
        title,
        description,
        date,
        isPrivate
    }
  
    const handleSubmit = () => {
      setPin(pin);
      setPopupIsOpen(false)
    }
  
    return (
        <div className = 'popupform'>
            <div className = 'box'>
                <form ref={form} onSubmit={handleSubmit}>
                    <input name="title" type="text" placeholder = 'Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <input name="date" type="text" placeholder = 'When did you visit?' value={date} onChange={(e) => setDate(e.target.value)}/>
                    <textarea placeholder = 'Description' name = 'description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <label>Private Pin <input name="private" type="checkbox" onChange={(e) => setIsPrivate(e.target.checked)} /></label>
                    <button type='submit'>Submit</button>
                </form>
                <button className="cancel-btn" onClick={() => setPopupIsOpen(false)}>Cancel</button>
            </div>
        </div>
    )
  }