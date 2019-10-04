import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Point from '@material-ui/icons/FiberManualRecord'

import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import PrintDisabledRoundedIcon from '@material-ui/icons/PrintDisabledRounded';


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
            props.status === 'Denied' ? <PrintDisabledRoundedIcon className={classes.iconHover} style={style} />: <div/>
      :
      <Point className={classes.iconHover} style={style} />}
    </div>
  );
}
