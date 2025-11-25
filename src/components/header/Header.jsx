import React from 'react';
import HomeIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Avatar, TextField} from "@mui/material";
import './header.css';

export default function Header(){
  return (
    <header className="app-header">

      <div className="header__left-group">
        {/* The menu icon now has the rounded button background */}
        <div className="header__icon-button">
          <HomeIcon />
        </div>
        <span className='header__text'>OUTREACH INVENTORY</span>
      </div>

      <div className="header__center-search">
        <TextField
          className="search-field"
          id="filled-search"
          label="Search" /* Changed label to "Search" */
          variant="filled"
          size="small"
        />
      </div>

      <div className="header__right-actions">
        {/* Notifications Icon with Badge */}
        <div className="notification-icon-wrapper">
          <NotificationsActiveIcon/>
          <span className="notification-count">4</span> {/* The '4' badge */}
        </div>

        {/* Profile Avatar (using a more styled wrapper to mimic the image) */}
        <div className="profile-avatar-wrapper">
          {/* Using MUI Avatar for the yellow circle and profile icon */}
          <Avatar sx={{bgcolor: '#ffc107', color: '#333'}}>
            <AccountCircleIcon/> {/* Or a letter, e.g., "A" */}
          </Avatar>
         <span className="profile-name">User</span>
        </div>
      </div>

    </header>
  )
}