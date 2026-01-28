import React, { useState } from "react";

const OFFICE_LOCATION = {
  lat: -7.3106665,
  lng: 112.7735401,
};

const MAX_DISTANCE = 150; 

const AttendanceLocation = () => {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Browser does not support Geolocation");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const dist = getDistanceInMeters(
          userLat,
          userLng,
          OFFICE_LOCATION.lat,
          OFFICE_LOCATION.lng
        );

        setLocation({ userLat, userLng });
        setDistance(dist.toFixed(2));

        if (dist <= MAX_DISTANCE) {
          setIsValid(true);
          setError(null);
        } else {
          setIsValid(false);
          setError("You are too far from the office location.");
        }
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Absennnnn</h2>

      <button onClick={getLocation}>
        Get My Location
      </button>

      {location && (
        <div style={{ marginTop: 10 }}>
          <p>Latitude: {location.userLat}</p>
          <p>Longitude: {location.userLng}</p>
          <p>Distance: {distance} meter</p>
        </div>
      )}

      {isValid && (
        <p style={{ color: "green" }}>
          Valid location.
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          WOIII!!! {error}
        </p>
      )}
    </div>
  );
};

export default AttendanceLocation;
