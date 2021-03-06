import React from "react";
import { connect } from "react-redux";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutoComplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import mapStyles from "../../public/mapStyles";
import { setNewPin, getAllPins, deletePin, updatePin, getSinglePin } from "../store/Pin";
import Toggle from './ToggleSwitch';
import AllUsersPins from './AllUsersPins';


const libraries = ["places"];

const mapContainerStyle = {
  width: "80vw",
  height: "100vh",
};

const center = {
  lat: 37.09024,
  lng: -95.712891,
};

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: false,
};

// MAP
const Map = (props) => {
  React.useEffect(() => {
    props.getPins(props.userId);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    console.log(mapRef)
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA9lRj2cBCFpJzuI0EzO4yiXexo1h0XVk4",
    libraries,
  });

  const [lat, setLat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const [isPinOpen, setIsPinOpen] = React.useState({});
  const [popupIsOpen, setPopupIsOpen] = React.useState(false);
  const [updatePopupIsOpen, setUpdatePopupIsOpen] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  
  const toggleInfoWindow = (pinId) => {
    setIsPinOpen({
        ...isPinOpen,
        [pinId]: !isPinOpen[pinId],
      });
  }

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading...";
  
  return (
    <div className = 'map'>
      <div className = 'mapright'>
        <h1>Hi, {props.firstName}</h1>
        <p>Keep track of all of the awesome places you've traveled! Simply click the location on the map to add a pin. You may utilize the search bar or geolocation below to find a location.</p>
        <Search panTo={panTo}/>
        <Locate panTo={panTo} />
        <Toggle onChange={(event) => setToggled(event.target.checked)} toggled={toggled}/>
        <p className='toggle-lbl'>{toggled ? 'All users pins': 'My pins only'}</p>
      </div>
    
    <div className = 'mapleft'>
      <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={3.5}
          center={center}
          options={options}
          onClick={(event) => {
            console.log(props)
            setLat(event.latLng.lat())
            setLong(event.latLng.lng())
            setPopupIsOpen(true)
          }}
          onLoad={onMapLoad}
        >

          {popupIsOpen && <PinPopup lat={lat} long={long} userId={props.userId} setPin={props.setPin} setPopupIsOpen={setPopupIsOpen}/>}
          {updatePopupIsOpen && <UpdatePopup pin={props.pin} updatePin={props.updatePin} setUpdatePopupIsOpen={setUpdatePopupIsOpen}/>}
          {toggled && <AllUsersPins isPinOpen={isPinOpen} toggleInfoWindow={toggleInfoWindow} userId={props.userId} />}

          {props.pins.map((pin) => (
            <Marker
              onClick={() => {
                  toggleInfoWindow(pin.id)
                  props.getSinglePin(pin.id)
              }}
              key={pin.id}
              position={{ lat: pin.latitude, lng: pin.longitude }}
              icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            >
              {isPinOpen[pin.id] && (
                <InfoWindow 
                  onCloseClick={() => {
                    toggleInfoWindow(pin.id)
                  }}
                  position={{ lat: pin.latitude, lng: pin.longitude }}
                >
                  <div className = 'infowindow'>
                    <h3>{pin.title}</h3>
                    <h4>{`Visited: ${pin.date}`}</h4>
                    <p>{pin.description}</p>
                    <div className = 'infowindow-buttons'>
                      <button className='infowindow-btn' onClick={() => props.deletePin(pin.id)}>Remove</button>
                      <button className='infowindow-btn' onClick={() => setUpdatePopupIsOpen(true)}>Update</button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

// UPDATE POP UP BOX
function UpdatePopup ({pin, updatePin, setUpdatePopupIsOpen}) {
  const [title, setTitle] = React.useState(pin.title);
  const [description, setDescription] = React.useState(pin.description)
  const [date, setDate] = React.useState(pin.date)
  const form = React.useRef()

  const handleSubmit = () => {
    updatePin({...pin, title, description, date});
    setUpdatePopupIsOpen(false)
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

// POP UP BOX
function PinPopup ({lat, long, userId, setPin, setPopupIsOpen}) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState('')
  const form = React.useRef()

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

// GEOLOCATION
function Locate({panTo}) {
  return (
    <button onClick = {() => {
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

// SEARCH BAR
function Search({panTo}) {
    const {
        ready,
        value,
        setValue, 
        suggestions: { status, data },
        clearSuggestions} = usePlacesAutoComplete()

    const handleInput = (e) => {
        setValue(e.target.value)
    }

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        console.log(results)
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    return (
      <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search Location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
    )
}

const mapDispatch = (dispatch) => {
  return {
    setPin: (userId, lat, lng, title, description, date) => dispatch(setNewPin(userId, lat, lng, title, description, date)),
    getPins: (userId) => dispatch(getAllPins(userId)),
    getSinglePin: (pinId) => dispatch(getSinglePin(pinId)),
    deletePin: (pinId) => dispatch(deletePin(pinId)),
    updatePin: (pin) => dispatch(updatePin(pin))
  };
};

const mapState = (state) => {
  return {
    pins: state.pins.pins,
    pin: state.pins.singlePin,
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState, mapDispatch)(Map);
