import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import PropsTypes from 'prop-types';

const AuthWrapper = ({children}) => {
  const images = [
    '/assets/images/01_Delhi-Office.jpg',
    '/assets/images/smbc-lobby.jpeg',
    // '/assets/images/unnamed.jpg',
    // '/assets/images/Web.jpg',
    '/login-bg.jpg',

  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        position: 'relative',
        minHeight: '100vh',
        minWidth: '100%',
        // backgroundSize:"100%,100%",
        background: `url(${images[currentImageIndex]}) no-repeat fixed center top / cover transparent`,
//        backgroundColor: (theme) => theme.palette.background.default,

        '& .app-content-view': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        },
        '& .footer': {
          marginRight: 0,
          marginLeft: 0,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropsTypes.node,
};
