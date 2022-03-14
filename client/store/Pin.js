import axios from 'axios';

// ACTION TYPES
const SET_NEW_PIN = 'SET_NEW_PIN';
const GET_ALL_PINS = 'GET_ALL_PINS';

// ACTION CREATORS
const _setNewPin = (pin) => ({
    type: SET_NEW_PIN,
    pin
})

const _getAllPins = (pins) => ({
    type: GET_ALL_PINS,
    pins
})

// THUNK CREATORS 

export const setNewPin = (latitude, longitude, userId) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.post(`/api/pins/add/${userId}`, {latitude, longitude})
            console.log(data)
            dispatch(_setNewPin(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const getAllPins = (userId) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/api/pins/${userId}`)
            console.log(data)
            dispatch(_getAllPins(data))
        } catch (error) {
            console.error(error)
        }
    }
}

// INITIAL STATE
const initialState = {
    pins: [],
    singlePin: {}
}

// REDUCER
export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NEW_PIN:
            return {
                ...state,
                pins: [...state.pins, action.pin]
            }
        case GET_ALL_PINS:
            return {
                ...state,
                pins: [...action.pins]
            }
        default: 
            return state
    }
}