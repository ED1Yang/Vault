import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import { Link as RouterLink } from 'react-router-dom';
//Side-bar Icons
import { Icon } from '@material-ui/core';
//secondary list Icons
// import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
  <ListItem
      button
      component={RouterLink}
      to="/dashboard"
      >
      <ListItemIcon>
        <Icon>dashboard</Icon>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem
      button
      component={RouterLink}
      to="/projects"
      >
      <ListItemIcon>
        <Icon>location_city</Icon>
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItem>

    <ListItem
      button
      component={RouterLink}
      to="/clients"
      >
      <ListItemIcon>
        <Icon>people</Icon>
      </ListItemIcon>
      <ListItemText primary="Clients" />
    </ListItem>


    <ListItem
      button
      component={RouterLink}
      to="/floorplans"
      >
      <ListItemIcon>
        <Icon>layers</Icon>
      </ListItemIcon>
      <ListItemText primary="Floor plans" />

    </ListItem>


    <ListItem
      button
      component={RouterLink}
      to="/login"
      >
      <ListItemIcon>
        <Icon>account_box</Icon>
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItem>

  </div>
);

// other entries

// export const empListItems = (
//   <div>
//   <ListItem
//       button
//       component={RouterLink}
//       to="/dashboard"
//       >
//       <ListItemIcon>
//         <Icon>dashboard</Icon>
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItem>

//     <ListItem
//       button
//       component={RouterLink}
//       to="/floorplans"
//       >
//       <ListItemIcon>
//         <Icon>layers</Icon>
//       </ListItemIcon>
//       <ListItemText primary="Floor plans" />

//     </ListItem>

//     <ListItem
//       button
//       component={RouterLink}
//       to="/login"
//       >
//       <ListItemIcon>
//         <Icon>account_box</Icon>
//       </ListItemIcon>
//       <ListItemText primary="Account" />
//     </ListItem>

//   </div>
// );

// export const clientListItems = (
//   <div>
//   <ListItem
//       button
//       component={RouterLink}
//       to="/dashboard"
//       >
//       <ListItemIcon>
//         <Icon>dashboard</Icon>
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItem>

//     <ListItem
//       button
//       component={RouterLink}
//       to="/floorplan"
//       >
//       <ListItemIcon>
//         <Icon>layers</Icon>
//       </ListItemIcon>
//       <ListItemText primary="Floor plans" />
//     </ListItem>

//     <ListItem
//       button
//       component={RouterLink}
//       to="/login"
//       >
//       <ListItemIcon>
//         <Icon>account_box</Icon>
//       </ListItemIcon>
//       <ListItemText primary="Account" />
//     </ListItem>

//   </div>
// );


//secondary lists


// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Current Projects</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Office Building" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Central Hospital" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Clinic #5919" />
//     </ListItem>
//   </div>
// );