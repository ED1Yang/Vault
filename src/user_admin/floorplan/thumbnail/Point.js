import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Point from '@material-ui/icons/FiberManualRecord'

import BrightnessLowRoundedIcon from '@material-ui/icons/BrightnessLowRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import PrintDisabledRoundedIcon from '@material-ui/icons/PrintDisabledRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import LocationOffRoundedIcon from '@material-ui/icons/LocationOffRounded';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconHover: {
    cursor: "pointer",
    '&:hover': {
      color: red[800],
    },
  },
}));

export default function Icons(props) {

  const classes = useStyles();

  let style = {
    fontSize: 24 * props.rate + 'px',
  }
  return (
    <div className={classes.root} >
      {props.cbmode?
        props.status === 'Uploaded' ? <CameraAltRoundedIcon className={classes.iconHover} style={style} />:
          props.status === 'Done' ? <CheckCircleRoundedIcon className={classes.iconHover} style={style} />:
            props.status === 'Denied' ? <PrintDisabledRoundedIcon className={classes.iconHover} style={style} />:
              props.status === 'Requested' ? <BrightnessLowRoundedIcon className={classes.iconHover} style={style} />:
                props.status === 'New' ? <StarBorderRoundedIcon className={classes.iconHover} style={style} />:
                  props.status === 'Reject' ? <LocationOffRoundedIcon className={classes.iconHover} style={style} />:
                    props.status === 'Deleted' ? <CancelRoundedIcon className={classes.iconHover} style={style} />:
                      props.status === 'Assigned' ?<StarRoundedIcon className={classes.iconHover} style={style} />: <div/>
      :
      <Point className={classes.iconHover} style={style} />}
    </div>
  );
}
