// React
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import PersonIcon from '@material-ui/icons/Person';

// Custom styles
import './Sidebar.css';

function ResponsiveDrawer(props) {
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
       <Typography className="app-title" variant="h5">
        Episodic
      </Typography>
      <Divider />
      <List>
        <NavLink to="/trends" className="nav-button">
          <ListItem button>
            <ListItemIcon><TrendingUpIcon style={{"color": "white"}}/></ListItemIcon>
            <ListItemText primary="Trends"/>
          </ListItem>
        </NavLink>
        <NavLink to="/review-form" className="nav-button">
          <ListItem button>
            <ListItemIcon><RateReviewIcon style={{"color": "white"}}/></ListItemIcon>
            <ListItemText primary="Review Form"/>
          </ListItem>
        </NavLink>
        <NavLink to="/review-history" className="nav-button">
          <ListItem button>
            <ListItemIcon><ThumbsUpDownIcon style={{"color": "white"}}/></ListItemIcon>
            <ListItemText primary="Review History"/>
          </ListItem>
        </NavLink>
        <NavLink to="/reviewer-metadata" className="nav-button">
          <ListItem button>
            <ListItemIcon><PersonIcon style={{"color": "white"}}/></ListItemIcon>
            <ListItemText primary="Reviewer Metadata"/>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  return (
    <div className="sidebar-container">
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>
          <Typography className="app-title" variant="h6" noWrap>
            Episodic
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className="drawer">
        <Hidden mdUp>
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
          <Drawer
            className="permanentDrawer"
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;