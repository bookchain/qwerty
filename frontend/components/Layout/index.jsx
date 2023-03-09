import { async } from 'regenerator-runtime';
import { clear } from 'console';
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './module.HeaderStyle.css';
import enter from './enter.png';
import exit from './exit.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout({ wallet, isSignedIn, guestBook }) {
  const signIn = () => {
    wallet.signIn();
  };

  const signOut = () => {
    wallet.signOut();
  };

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const sideBarItems = [
    ['ABOUT', '/'],
    ['READ', '/read'],
    ['BET', '/bet'],
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar sx={{ background: 'cornflowerblue' }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            BOOKCHAIN
          </Typography>

          {/* {props.renderAdditionalElementsAppBar?.()} */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh',
          }}>
          <List>
            {sideBarItems.map((item, index) => (
              <ListItem button key={index} sx={{ bgcolor: 'white' }}>
                {/* <ListItemText primary={item} sx={{ textAlign: 'center', color: 'black' }} /> */}
                <NavLink className="menuItem" onClick={() => setOpen(false)} to={item[1]}>
                  {item[0]}
                </NavLink>
                <Divider />
              </ListItem>
            ))}
          </List>
          <Box sx={{ textAlign: 'center', color: 'grey', mb: 3 }}>mail@bookchain.page</Box>
        </Box>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>

    // <div className="container">
    //   <div className="bookJack">BOOKCHAIN</div>
    //   {isSignedIn ? (
    //     <div className="login" onClick={signOut}>
    //       <img className="enter" src={exit} />
    //     </div>
    //   ) : (
    //     <div className="login" onClick={signIn}>
    //       <img className="enter" src={enter} />
    //     </div>
    //   )}

    //   <div className="navMenu">
    //     <NavLink className="menuItem" to="/">
    //       IDEA
    //     </NavLink>
    //     <NavLink className="menuItem" to="bet">
    //       BET
    //     </NavLink>
    //     <NavLink className="menuItem" to="read">
    //       READ
    //     </NavLink>
    //   </div>

    //   <Outlet />
    // </div>
  );
}
