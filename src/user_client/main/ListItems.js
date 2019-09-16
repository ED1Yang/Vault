import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@material-ui/core';

export const mainListItems = (
  <div>
  <ListItem
      button
      component={RouterLink}
      to="/client/dashboard"
      >
      <ListItemIcon>
        <Icon>dashboard</Icon>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem
      button
      component={RouterLink}
      to="/client/projects"
      >
      <ListItemIcon>
        <Icon>location_city</Icon>
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItem>
  </div>
);