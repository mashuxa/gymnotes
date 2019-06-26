import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";


// navigator.geolocation.getCurrentPosition(function (location) {
//     //callback
//     // location.coords.latitude ||
//     // location.coords.longitude ||
// });




let Map = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap defaultZoom={14} center={{lat: props.coordinates.lat, lng: props.coordinates.lng}}>
            <Marker position={{lat: props.coordinates.lat, lng: props.coordinates.lng}}/>
        </GoogleMap>
    );
    }
));


export {Map};
