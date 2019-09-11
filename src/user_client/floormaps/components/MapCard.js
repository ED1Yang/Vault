import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

//
// import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
  const { className, map, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        {/* Div for test */}
        <Link to={{ pathname:'/client/floorplans/asbuilt-ground-floor' , state:{ floorID: map.FloorID, floorplan: map.Floorplan}}}>
          <div className={classes.imageContainer}>
            <img
              alt="Map"
              className={classes.image}
              src={map.Floorplan}

            />
          </div>
          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {map.Floornumber}
          </Typography>
        </Link>
        <Typography
          align="center"
          variant="body1"
        >
          {map.Floordesc}
        </Typography>
      </CardContent>
    </Card>
  );
};

MapCard.propTypes = {
  className: PropTypes.string,
  map: PropTypes.object.isRequired
};

export default MapCard;
