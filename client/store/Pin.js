import axios from 'axios';

// ACTION TYPES
const SET_NEW_PIN = 'SET_NEW_PIN';
const GET_ALL_PINS = 'GET_ALL_PINS';
const SINGLE_PIN = 'SINGLE_PIN';
const DELETE_PIN = 'DELETE_PIN';
const UPDATE_PIN = 'UPDATE_PIN';
const ALL_USERS_PINS = 'ALL_USERS_PINS';

// ACTION CREATORS
const _setNewPin = (pin) => ({
    type: SET_NEW_PIN,
    pin
})

const _getAllPins = (pins) => ({
    type: GET_ALL_PINS,
    pins
})

const _getAllUsersPins = (pins) => ({
    type: ALL_USERS_PINS,
    pins
})

const setSinglePin = (pin) => ({
      type: SINGLE_PIN,
      pin
  })

const _deletePin = (pin) => {
    return {
        type: DELETE_PIN,
        pin
    }
}

const _updatePin = (pin) => {
    return {
      type: UPDATE_PIN,
      pin
    }
  }

// THUNK CREATORS 

export const setNewPin = (userId, latitude, longitude, title, description, date) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.post(`/api/pins/add/${userId}`, {latitude, longitude, title, description, date})
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

export const getAllUsersPins = (userId) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/api/pins/allUsersPins/${userId}`)
            dispatch(_getAllUsersPins(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const getSinglePin = (id) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`/api/pins/singlePin/${id}`)
        dispatch(setSinglePin(data))
      } catch (err) {
        console.error(err)
      }
    }
  }

export const deletePin = (id) => {
    return async (dispatch) => {
        const {data} = await axios.delete(`/api/pins/${id}`)
        dispatch(_deletePin(data))
    }
}

export const updatePin = (pin) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.put(`/api/pins/${pin.id}`, pin)
        dispatch(_updatePin(data))
      } catch(err) {
        console.error(err)
      }
    }
  }

// INITIAL STATE
const initialState = {
    pins: [],
    singlePin: {},
    allUsersPins: []
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
        case ALL_USERS_PINS:
            return {
                ...state,
                allUsersPins: [...action.pins]
            }
        case SINGLE_PIN:
            return {
                ...state,
                singlePin: action.pin
            }
        case DELETE_PIN:
            return {
                ...state,
                pins: state.pins.filter((pin) => pin.id !== action.pin.id)
            }
        case UPDATE_PIN:
            return {
                ...state,
                singlePin: action.pin
            }
        default: 
            return state
    }
}