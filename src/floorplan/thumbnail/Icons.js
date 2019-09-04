import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Point from '@material-ui/icons/FiberManualRecordTwoTone'

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

  let style={
    fontSize:24*props.rate+'px',
  }

  return (
    <div className={classes.root} >
        <Point className={classes.iconHover} style={style}/>
      </div>
    );
  }
