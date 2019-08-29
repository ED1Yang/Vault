import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';



import ProjectsToolbar from './components/ProjectsToolbar'
import ProjectCard from './components/ProjectCard';
import Dashboard from '../dashboard/Dashboard'

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

const ProjectList = () => {
  const classes = useStyles();

  const [projects] = useState(mockData);

  const contents =
    <div className={classes.root}>
      <ProjectsToolbar />
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
              {/* <Link color="inherit" href={project.link}> */}
                <ProjectCard 
                  project={project} onClick={console.}/>
              {/* </Link> */}
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

  return <Dashboard value={contents} />
};

export default ProjectList;
