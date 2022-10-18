import React, { useState } from 'react';

export default function UpdatePopup ({pin, updatePin, setUpdatePopupIsOpen}) {
    const [title, setTitle] = useState(pin.title);
    const [description, setDescription] = useState(pin.description)
    const [date, setDate] = useState(pin.date)
  
    const handleSubmit = () => {
      updatePin({...pin, title, description, date});
      setUpdatePopupIsOpen(false)
    }
  
    return (
        <div className = 'popupform'>
            <div className = 'box'>
                <form onSubmit={handleSubmit}>
                    <input name="title" type="text" placeholder = 'Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <input name="date" type="text" placeholder = 'When did you visit?' value={date} onChange={(e) => setDate(e.target.value)}/>
                    <textarea placeholder = 'Description' name = 'description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
  }