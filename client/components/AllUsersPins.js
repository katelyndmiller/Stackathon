import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { getAllUsersPins } from "../store/Pin";

const AllUsersPins = (props) => {
  useEffect(() => {
    props.getAllUsersPins(props.userId);
  }, []);

  return (
    <div>
      {props.allUsersPins.map((pin) => (
        <Marker
          onClick={() => {
            props.toggleInfoWindow(pin.id);
          }}
          key={pin.id}
          position={{ lat: pin.latitude, lng: pin.longitude }}
          icon={{
            url: "blackpin.png",
            scaledSize: new window.google.maps.Size(30,30),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15)
          }}
        >
          {props.isPinOpen[pin.id] && (
            <InfoWindow
              onCloseClick={() => {
                props.toggleInfoWindow(pin.id);
              }}
              position={{ lat: pin.latitude, lng: pin.longitude }}
            >
              <div className="infowindow">
                <h3>{pin.title}</h3>
                <h4>{`Visited: ${pin.date}`}</h4>
                <p>{pin.description}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    getAllUsersPins: (userId) => dispatch(getAllUsersPins(userId)),
  };
};

const mapState = (state) => {
  return {
    allUsersPins: state.pins.allUsersPins,
  };
};

export default connect(mapState, mapDispatch)(AllUsersPins);
