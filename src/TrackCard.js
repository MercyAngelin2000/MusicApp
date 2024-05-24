// TrackCard.js
import React, { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const TrackCard = ({ track, player, deviceId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
console.log(deviceId);
  const togglePlay = () => {
    if (!player || !deviceId) return;

    if (isPlaying) {
      player.pause();
    } else {
      player._options.getOAuthToken((token) => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [track.uri] }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="track-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', cursor: 'pointer', position: 'relative' }}>
      <img src={track.album.images[0].url} alt={track.name} style={{ width: '100px', height: '100px' }} />
      <div>
        <h3>{track.name}</h3>
        <p>{track.artists[0].name}</p>
      </div>
      <button onClick={togglePlay} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
    </div>
  );
};

export default TrackCard;
