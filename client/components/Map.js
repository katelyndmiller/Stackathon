import React from "react";
import { connect } from "react-redux";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polyline,
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
import { setNewPin, getAllPins } from "../store/Pin";


const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 37.09024,
  lng: -95.712891,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  React.useEffect(() => {
    props.getPins(props.userId);
  }, []);

  const [isPinOpen, setIsPinOpen] = React.useState({});

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA9lRj2cBCFpJzuI0EzO4yiXexo1h0XVk4",
    libraries,
  });

  const toggleInfoWindow = (pinId) => {
    setIsPinOpen({
        ...isPinOpen,
        [pinId]: !isPinOpen[pinId],
      });
  }

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading...";
  
  return (
    <div>
      <h2 className="mapTitle">Places you've been!</h2>

      <Search />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={3.5}
        center={center}
        options={options}
        onClick={(event) => {
          props.setPin(event.latLng.lat(), event.latLng.lng(), props.userId);
        }}
      >
        {props.pins.map((pin) => (
          <Marker
            onClick={() => {
                toggleInfoWindow(pin.id)
            }}
            key={pin.id}
            position={{ lat: pin.latitude, lng: pin.longitude }}
          >
            {isPinOpen[pin.id] && (
              <InfoWindow 
              onCloseClick={() => {
                toggleInfoWindow(pin.id)
              }}
              position={{ lat: pin.latitude, lng: pin.longitude }}>
                <div style={{}}>
                  <h1>InfoWindow</h1>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

function Search({panTo}) {
    const {
        ready,
        value,
        setValue, 
        suggestions: { status, data },
        clearSuggestions} = usePlacesAutoComplete({
            requestOptions: {
                location: { lat: () => 37.09024, lng: () => -95.712891 },
                radius: 100 * 5000,
            }
        })

    const handleInput = (e) => {
        setValue(e.target.value)
    }

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
    
        try {
          const results = await getGeocode({ address });
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
                    placeholder="Search..."
                />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && data.map(({id, description}) => {
                        <ComboboxOption key={id} value={description} />
                    })}
                </ComboboxList>
            </ComboboxPopover>
            </Combobox>
        </div>
    )
}

const mapDispatch = (dispatch) => {
  return {
    setPin: (lat, lng, userId) => dispatch(setNewPin(lat, lng, userId)),
    getPins: (userId) => dispatch(getAllPins(userId)),
  };
};

const mapState = (state) => {
  return {
    pins: state.pins.pins,
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState, mapDispatch)(Map);
