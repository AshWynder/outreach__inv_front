import React, {Fragment, useEffect, useRef, useState} from 'react';
import HomeIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Avatar,
  CircularProgress,
  Divider,
  ListItem,
  ListItemText,
  Popover,
  TextField,
  Typography,
  List
} from '@mui/material';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { actions } from '../../context/actions.js';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

export default function Header() {
  const { state, dispatch } = useApp();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const { notifications, loading, currentUser, error } = state;

  // fetching logged in user
  useEffect(() => {
    actions.fetchLoggedInUser(dispatch);
  }, [dispatch]);

  // fetch notifications
  useEffect(() => {
    actions.fetchNotifications(dispatch);
  }, [dispatch]);

  // calculating unread count
  const unreadCount = notifications.unread;
  console.log(notifications, unreadCount);

  // handling notifications bell click
  const handleBellClick = (e) => {
    setAnchorEl(e.currentTarget);

    //refreshing notifications
    actions.fetchNotifications(dispatch);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.readAt) {
      await actions.updateNotification(dispatch, notification._id);
    }

    // navigate if there's a link
    if (notification.link) navigate(notification.link);

    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <header className="app-header">
      <div className="header__left-group">
        {/* The menu icon now has the rounded button background */}
        <div className="header__icon-button">
          <HomeIcon />
        </div>
        <span className="header__text">OUTREACH INVENTORY</span>
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
          <IconButton onClick={handleBellClick} color="inherit">
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsActiveIcon sx={{ fontSize: 28 }} />
              </Badge>
            )}
          </IconButton>

          {/*notification drop down*/}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 380, maxHeight: 600, mt: 1 },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold" color="text.secondary">
                Notifications
                {unreadCount > 0 && (
                  <Typography component="span" color="error" sx={{ ml: 1 }}>
                    ({unreadCount} new)
                  </Typography>
                )}
              </Typography>
            </Box>
            <Divider />

            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No Notifications"
                  secondary="You are all caught up!"
                />
              </ListItem>
            ) : (
              <List sx={{ p: 0 }}>
                {notifications?.notifications?.map((notification) => (
                  <Fragment key={notification.id}>
                    <ListItem
                      button
                      onClick={() => handleNotificationClick(notification)}
                      sx={{
                        bgcolor: !notification.readAt
                          ? 'teal.50'
                          : 'transparent',
                        '&:hover': { bgcolor: 'teal.100' },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            fontWeight={notification.readAt ? 'normal' : 'bold'}
                          >
                            {notification.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              gutterBottom
                            >
                              {notification.message.charAt(0).toUpperCase() +
                                notification.message.slice(1)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 3 }}
                            >
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </Fragment>
                ))}
              </List>
            )}
          </Popover>
        </div>

        {/* Profile Avatar (using a more styled wrapper to mimic the image) */}
        <div className="profile-avatar-wrapper">
          {/* Using MUI Avatar for the yellow circle and profile icon */}
          <Avatar sx={{ bgcolor: '#ffc107', color: '#333' }}>
            <AccountCircleIcon /> {/* Or a letter, e.g., "A" */}
          </Avatar>
          <span className="profile-name">{currentUser.name}</span>
        </div>
      </div>
    </header>
  );
}
