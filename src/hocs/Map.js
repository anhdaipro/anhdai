import React,{useState} from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

const options = { closeBoxURL: '', enableEventPropagation: true };

const Map = () => {
  const [state,setState]=useState([{lat:10.779905,lng:106.661398}])
  const onClick=(e)=> {
    console.log(e)
  }
  return (
    <div>
      <GoogleMap
          defaultZoom={15}
          onClick={onClick}
          defaultCenter={{ lat: 10.779905, lng: 106.661398
          
          }}
        >
          {state.map(item=>
          <Marker
              icon={{
                url: 'https://freepngimg.com/thumb/google/66948-map-google-maker-pin-maps-free-transparent-image-hd.png',
                scaledSize: new window.google.maps.Size(32, 40),
              }}
              position={{ lat: item.lat, lng: item.lng}}
          >
                         
          </Marker>
        )}
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));