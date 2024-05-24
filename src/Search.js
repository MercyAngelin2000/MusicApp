// Search.js
import React, { useState } from 'react';
import axios from 'axios';
import TrackCard from './TrackCard';
import useSpotifyPlayer from './useSpotifyPlayer';

const Search = ({ token }) => {
  const [searchKey, setSearchKey] = useState('');
  const [tracks, setTracks] = useState([]);
  const { player, deviceId } = useSpotifyPlayer(token);

  const searchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: 'track',
      },
    });
console.log(data.tracks.items);
    setTracks(data.tracks.items);
  };

  return (
    <div>
      <form onSubmit={searchTracks} >
        <div className='input-group'>
        <input
          type="text"
          className='form-control input_field'
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit" className='btn btn-success'>Search</button>
        </div>
      </form>
      <div className="track-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} player={player} deviceId={deviceId} />
        ))}
      </div>
    </div>
  );
};

export default Search;
