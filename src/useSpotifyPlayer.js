// import React, { useEffect } from 'react';

// const useSpotifyPlayer = () => {
//   useEffect(() => {
//     const token = window.localStorage.getItem('token'); 
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const player = new window.Spotify.Player({
//         name: 'Web Playback SDK Quick Start Player',
//         getOAuthToken: cb => { cb(token); },
//         volume: 0.5
//       });
//       player.addListener('ready', ({ device_id }) => {
//         console.log('Ready with Device ID', device_id);
//       });

//       player.addListener('not_ready', ({ device_id }) => {
//         console.log('Device ID has gone offline', device_id);
//       });

//       player.addListener('initialization_error', ({ message }) => {
//         console.error(message);
//       });

//       player.addListener('authentication_error', ({ message }) => {
//         console.error(message);
//       });

//       player.addListener('account_error', ({ message }) => {
//         console.error(message);
//       });

//       player.connect();
//     }
//   }, []);

//   const togglePlay = () => {
//     if (window.Spotify) {
//       const player = new window.Spotify.Player({});
//       player.togglePlay();
//     }
//   };

//   return (
//     <div>
//       <h1>Spotify Web Playback SDK Quick Start</h1>
//       <button onClick={togglePlay}>Toggle Play</button>
//     </div>
//   );
// };

// export default useSpotifyPlayer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const SpotifyApp = ({ token }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = token || window.localStorage.getItem('token');
  const [currentTrack, setCurrentTrack] = useState(null);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSearchResults(response.data.tracks.items);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchQuery !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear search results if the query is empty
    }
  }, [searchQuery, accessToken]);
  const playTrack = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      // If the clicked track is already playing, pause it
      setCurrentTrack(null);
    } else {
      // Pause the currently playing track (if any) and start playing the new one
      setCurrentTrack(track);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col input-group">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search for a song..."
            defaultValue={searchQuery}
            onBlur={handleSearchInputChange}
          />
        </div>
      </div>
      <div className="row">
        {searchResults.map((track) => (
          <div key={track.id} className="col-lg-3 col-md-4 col-sm-6 col_FIELD">
            <div className="card m-4">
              <img src={track.album.images[0].url} className="card-img-top" alt={track.name} />
              <div className="">
                <div className='d-flex justify-content-between align-items-center'>
                <div className=" fw-bold">{track.name}</div>
                <button className="btn" onClick={() => playTrack(track)}>
                  {currentTrack && currentTrack.id === track.id ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause svgIcon" viewBox="0 0 16 16">
                      <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play svgIcon" viewBox="0 0 16 16">
                      <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                    </svg>}
                </button>
                </div>
                {/* ?.substring(0, 35) + "..." */}
                <small className="card-text" title={track.artists.map((artist) => artist.name).join(', ')}>{track.artists.map((artist) => artist.name).join(', ')}</small>
                {currentTrack && currentTrack.id === track.id && (
                  <audio controls autoPlay className='audio_fld'>
                    <source src={track.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifyApp;
