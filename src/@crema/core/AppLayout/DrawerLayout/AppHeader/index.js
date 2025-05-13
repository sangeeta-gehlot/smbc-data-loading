import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import AppLngSwitcher from '@crema/core/AppLngSwitcher';
import Box from '@mui/material/Box';
// import AppSearchBar from '@crema/core/AppSearchBar';
// import Hidden from '@mui/material/Hidden';
// import IconButton from '@mui/material/IconButton';
// import {toggleNavCollapsed} from 'redux/actions';
// import MenuIcon from '@mui/icons-material/Menu';
// import {useDispatch} from 'react-redux';
// import AppMessages from '../../../AppMessages';
// import AppNotifications from '../../../AppNotifications';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import AppTooltip from '../../../AppTooltip';
// import {alpha} from '@mui/material/styles';
import AppLogo from '../../components/AppLogo';
import { Fonts } from 'shared/constants/AppEnums';
import { useAuthMethod, useAuthUser } from '@crema/utility/AuthHooks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const { logout } = useAuthMethod();
  const { user } = useAuthUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const navigate = useNavigate();
  const [currDate, setCurrDate] = useState('');
  const [currTime, setCurrTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      setCurrDate(formattedDate);
      setCurrTime(now.toLocaleTimeString());
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const dispatch = useDispatch();

  return (
    <AppBar
      position='relative'
      color='inherit'
      sx={{
        boxShadow: 'none',
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        backgroundColor: 'background.paper',
        width: '100%',
      }}
      className='app-bar'
    >
      <Toolbar
        sx={{
          boxSizing: 'border-box',
          minHeight: { xs: 56, sm: 70 },
          paddingLeft: { xs: 5 },
          paddingRight: { xs: 5, md: 7.5 },
        }}
      >
        <Box
          sx={{
            '& .logo-text': {
              display: { xs: 'none', sm: 'block' },
            },
          }}
        >
          <AppLogo />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <div>
          <div>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
              }}
            >
              <Box
                sx={{
                  mb: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: 16,
                  fontWeight: Fonts.MEDIUM,
                  color: 'inherit',
                }}
                component='span'
              >
                {user.displayName ? user.displayName : 'Admin '}
              </Box>
              <Box
                sx={{
                  ml: 3,
                  color: 'inherit',
                  display: 'flex',
                }}
                onClick={handleClick}
              >
                <ExpandMoreIcon />
              </Box>
            </Box>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>  </div>
          <Box
            sx={{
              mb: 2,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'inherit',
            }}
          >
            <b>Login Time:</b>({currDate}  {currTime})
          </Box></div>

      </Toolbar>

    </AppBar>
  );
};
export default AppHeader;
