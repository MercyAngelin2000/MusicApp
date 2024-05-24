// SpotifyAuth.js
import React from 'react';

const clientId = process.env.REACT_APP_CLIENT_ID
const redirectUri = process.env.REACT_APP_REDIRECT_URI
const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT
const responseType = process.env.REACT_APP_RESPONSE_TYPE
const SpotifyAuth = () => {
  const handleLogin = () => {
    window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;
  };

  return (
    <div className='auth_page'>
      <div><h1 className='text-white p-2'> Where words leave off, music begins...</h1></div>
      <button className="btn buttonTag" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default SpotifyAuth;
