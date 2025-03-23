// src/pages/XummXApp.js
import React, { useEffect, useState } from 'react';

const XummXApp = () => {
  const [account, setAccount] = useState('Loading...');
  
  useEffect(() => {
    // Check if we're running inside the XUMM xApp environment.
    // The property name may vary—adjust according to the Xaman docs.
    if (window.XummXapp && window.XummXapp.user && window.XummXapp.user.token) {
      const userToken = window.XummXapp.user.token;
      console.log('User token from xApp environment:', userToken);
      
      // Call our backend /api/xumm/me endpoint with the user token.
      fetch(`http://localhost:5004/api/xumm/me?user_token=${userToken}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('User info from /me:', data);
          if (data.account) {
            setAccount(data.account);
          } else {
            setAccount('No account returned');
          }
        })
        .catch((err) => {
          console.error('Error calling /api/xumm/me:', err);
          setAccount('Error fetching account');
        });
    } else {
      console.log('Not running inside XUMM xApp environment');
      setAccount('Not a xApp environment');
    }
  }, []);
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Xumm xApp</h1>
      <p>Your XRPL Account: {account}</p>
    </div>
  );
};

export default XummXApp;