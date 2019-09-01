import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
//
// import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const MapCard = props => {
  const { className, project, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        {/* Div for test */}
        <Link href={project.link} variant="body2">
          <div className={classes.imageContainer}>
            <img
              alt="Project"
              className={classes.image}
              src={project.imageUrl}

            />
          </div>
          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {project.title}
          </Typography>
        </Link>
        <Typography
          align="center"
          variant="body1"
        >
          {project.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <PhotoCameraIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {project.totalPhotos} Photos
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

MapCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default MapCard;
