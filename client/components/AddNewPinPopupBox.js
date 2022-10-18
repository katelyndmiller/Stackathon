import React, { useState, useRef } from 'react';

export default function AddNewPinPopupBox ({lat, long, userId, setPin, setPopupIsOpen}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const form = useRef()
  
    const handleSubmit = () => {
      setPin(userId, lat, long, title, description, date);
      setPopupIsOpen(false)
    }
  
    return (
        <div className = 'popupform'>
            <div className = 'box'>
                <form ref={form} onSubmit={handleSubmit}>
                    <input name="title" type="text" placeholder = 'Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <input name="date" type="text" placeholder = 'When did you visit?' value={date} onChange={(e) => setDate(e.target.value)}/>
                    <textarea placeholder = 'Description' name = 'description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
  }