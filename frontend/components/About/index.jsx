import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { text } from './text';
import style from './module.styleAbout.css';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Opacity } from '@mui/icons-material';
import { indigo } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function About() {
  const [activeLang, setActiveLang] = useState('RU');
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveLang(Object.keys(text)[newValue]);
    // console.log(Object.keys(text)[newValue]);
  };

  return (
    <Box>
      {/* <div className="languageButtons">
        {Object.keys(text).map((lang) => (
          <div
            key={lang}
            className="lang"
            onPointerDown={() => setActiveLang(lang)}
            style={{ color: lang == activeLang ? 'brown' : 'black' }}>
            {lang}
          </div>
        ))}
      </div> */}
      <Box
        sx={{
          width: '80vw',
          bgcolor: 'background.paper',
          // transform: 'rotateZ(90deg)',
          // position: 'absolute',
          // top: '50%',
          // right: '-20%',
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example">
          {Object.keys(text).map((lang) => (
            <Tab key={lang} label={lang} />
          ))}
        </Tabs>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 5,
          m: 3,
          background: 'white',
          width: '80vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          // position: 'relative',
        }}>
        {text[activeLang].map((item, index) => (
          <Typography variant="h6" sx={{ textAlign: 'left' }}>
            {item}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
}
