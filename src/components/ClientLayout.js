// ClientLayout.js
import React, { useEffect, useState } from 'react';
import ClientSidebar from './ClientSidebar';
import { useLocation } from 'react-router-dom';

const ClientLayout = ({ children }) => {
  const location = useLocation()
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    if(location === '/' || location === '/login' || location === '/signup'){
        setShowNavbar(false)
    }
    else {
        setShowNavbar(true)
    }
  },[location])
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>{showNavbar && children}</div>
    </div>
  );
};

export default ClientLayout;
