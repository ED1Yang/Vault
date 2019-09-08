import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
//components
import TopToolbar from '../../components/TopToolbar'
import MapCard from './components/MapCard';
import Main from '../main/Main'

import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const MapList = () => {
  const classes = useStyles();

  const [projects] = useState(mockData);

  const contents =
    <div className={classes.root}>
      <TopToolbar title='floormap' />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {projects.map(project => (
            <Grid
              item
              key={project.id}
              lg={4}
              md={6}
              xs={12}
            >
                <MapCard project={project} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>

  return <Main value={contents} />
};

export default MapList;
