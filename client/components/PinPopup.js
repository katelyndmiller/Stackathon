import React, { useState } from "react";
import { connect } from "react-redux";
import Datepicker from 'react-datepicker'

function PinPopup () {
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    return (
        <div className = 'popupform'>
            <div className = 'box'>
                <form>
                    <input name="title" type="text" placeholder = 'Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <Datepicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <textarea placeholder = 'Description' name = 'description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

const mapDispatch = (dispatch) => {
    return {
      setPin: (lat, lng, userId) => dispatch(setNewPin(lat, lng, userId)),
    };
  };
  

export default connect(null, mapDispatch)(PinPopup);