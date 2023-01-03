import React, { useState,useRef,useCallback } from "react";
import Map from "./Map";

function GoogleMaps() {
  const key = 'AIzaSyBZVkd_qWs-BHzt0xzzAahhhIJBaynKSGQ'

  return (
    <div className="google-map">
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%`, margin: `auto`, border: '2px solid black' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
    </div>
  )
}

export default GoogleMaps;