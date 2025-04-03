import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const AuthWrapper = ({children}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          minHeight: {xs: 320, sm: 450},
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: {xs: '100%', sm: '50%', lg: '100%'},
            padding: {xs: 5, lg: 10},
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
        
      </Card>
    </Box>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
