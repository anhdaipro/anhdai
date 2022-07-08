import React, { Component } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

const Map = () => {
  return (
    <div>
      <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
      </GoogleMap>
    </div>
  );
}

export default Map;