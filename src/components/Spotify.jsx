import React, { useState } from "react";
import axios from "axios";

const Sportify = () => {
  const endPoint = "https://accounts.spotify.com/api/token";
  const clientId = "2692404c630143669547feedc4e2f13d";
  const clientSecret = "7caa99901a304122b7f114ebfeb6dc26";
  const trackId = "6rqhFgbbKwnb9MLmUQDhG6"; // Replace with the actual track ID

  const [trackInfo, setTrackInfo] = useState("");

  const getToken = () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = new URLSearchParams();
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    data.append("grant_type", "client_credentials");

    // Send POST request to get access token
    axios
      .post(endPoint, data, { headers })
      .then((response) => {
        // console.log(response);
        const accessToken = response.data.access_token;

        // Set the headers for the track request
        const trackHeaders = {
          Authorization: `Bearer ${accessToken}`,
        };

        // Send GET request to get track information
        axios
          .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: trackHeaders,
          })
          .then((trackResponse) => {
            // Handle the track response
            setTrackInfo(trackResponse.data);
            console.log(trackResponse.data);
          })
          .catch((trackError) => {
            // Handle track errors
            console.error("Error fetching track:", trackError);
          });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching token:", error);
      });
  };

  return (
    <main>
      <h1>Sportify</h1>
      <button onClick={getToken}>Fetch Music</button>

      {/* {trackInfo.map((element, i)=>(
        <div key={i}>
          <p>Title : {element}</p>
        </div>
      ))} */}

      {trackInfo && (
        <div>
          <h2>Track Details:</h2>
          <p>Title: {trackInfo.name}</p>
          <p>
            Artist Name(s): {trackInfo.artists.map((artist) => artist.name)}
          </p>
          <p>Album: {trackInfo.album.name}</p>
        </div>
      )}
    </main>
  );
};

export default Sportify;
