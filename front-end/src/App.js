// React
import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

// Material UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// Custom Components
import Sidebar from './components/Sidebar';
import Dashboard from './components/ReviewDashboard/Dashboard';
import ReviewHistory from './components/ReviewHistory/Table';
import ReviewForm from './components/ReviewForm/Form';
import ReviewerMetadataForm from './components/ReviewerMetadata/Form';

// Styles
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4A4883',
    },
    secondary: {
      main: '#4A4883'
    },
    action: {
      main: '#6285D9'
    },
    error: {
      main: '#C43A43'
    },
    warning: {
      main: '#BC2628'
    },
    accent: {
      main: '#26202E'
    },
    success: {
      main: '#6285D9'
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>     
        <Sidebar />
        <div id="overlay"></div>      
        {/* Necessary for content to be below app bar */}
        <div style={{minHeight : 100, width : '100%'}} />
        <Grid className="content" container >
          <Switch>
            <Route path="/trends" component={Dashboard} exact/>
            <Route path="/review-form" component={ReviewForm} exact/>
            <Route path="/review-history" component={ReviewHistory}/>
            <Route path="/reviewer-metadata" component={ReviewerMetadataForm}/>
            <Redirect from='/' to="/trends" />
          </Switch>
        </Grid>              
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;