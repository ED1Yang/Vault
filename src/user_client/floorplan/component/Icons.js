import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import Point from '@material-ui/icons/FiberManualRecord'
import Viewer from './Viewer';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Task from './Task';

import BrightnessLowRoundedIcon from '@material-ui/icons/BrightnessLowRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import PrintDisabledRoundedIcon from '@material-ui/icons/PrintDisabledRounded';
import LocationOffRoundedIcon from '@material-ui/icons/LocationOffRounded';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHover: {
    cursor: "pointer",
    '&:hover': {
      color: red[800],
    },
  },
  paper: {
    position: 'absolute',
    width: '85%',
    height: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0),
    //customized:
    'text-align': 'center',
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

function centerModal() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Icons(props) {
  let taskId = props.value.taskId;
  let x = props.value.x;
  let y = props.value.y;
  let info = props.value.info;

  const classes = useStyles();
  const [modalStyle] = React.useState(centerModal);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeButtonStyle = {
    position: 'absolute',
    right: '0',
    top: '0',
    margin: '10px',
    color: "#999999",
    cursor: "pointer",
    opacity: ".9",
  }

  let pointStyle = {};
  if (props.rate === undefined) {
    pointStyle = {
      fontSize: 24 * props.value.rate + 'px',
    }
  } else {
    pointStyle = {
      fontSize: 24 * props.rate + 'px',
    }
  }

  return (
    <div className={classes.root}>
      <Modal className='modals'
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <Viewer taskId={taskId}
            floorID={props.floorID}
            floorplan={props.floorplan}
            photoInfo={props.photoInfo}
            getdata={props.getdata}
            displaypoints={props.displaypoints}
            setRate={props.setRate} 
            cbmode={props.cbmode}
            />
          {/* close button */}
          <IconButton
            style={closeButtonStyle}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </div>
      </Modal>
      
      {props.cbmode?
      //colorblind mode
      props.value.newPoint === true ? <div id={'p' + taskId}><StarBorderRoundedIcon className={classes.iconHover} style={pointStyle} /></div> :
        props.value.status === 'Uploaded' ? <div id={'p' + taskId} onClick={handleOpen}><CameraAltRoundedIcon className={classes.iconHover} style={pointStyle} /></div> :
          props.value.status === 'Done' ? <div id={'p' + taskId} onClick={handleOpen}><CheckCircleRoundedIcon className={classes.iconHover} style={pointStyle} /></div> :
            props.value.status === 'Denied' ? <div id={'p' + taskId} onClick={handleOpen}><PrintDisabledRoundedIcon className={classes.iconHover} style={pointStyle} /></div> :
              props.value.status === 'Requested' ? <div id={'p' + taskId} onClick={Task.RequestedTask.bind(this, x, y, info, taskId, props)}><BrightnessLowRoundedIcon className={classes.iconHover} style={pointStyle} /></div> :
                props.value.status === 'New' ? <div id={'p' + taskId} onClick={Task.NewTask.bind(this, x, y, info)} ><StarBorderRoundedIcon className={classes.iconHover} style={pointStyle} /></div> :
                  props.value.status === 'Assigned' ? <div id={'p' + taskId} onClick={Task.AssignedTask.bind(this, x, y, info)}><StarRoundedIcon className={classes.iconHover} style={pointStyle} /></div> :
                  props.value.status === 'Reject' ? <div id={'p' + taskId} onClick={Task.RejectedTask.bind(this, x, y, info)}><LocationOffRoundedIcon className={classes.iconHover} style={pointStyle} /></div> : <div />
      :
      //normal mode
      props.value.newPoint === true ? <Point className={classes.iconHover} style={pointStyle} /> :
        props.value.status === 'Requested' ? <div id={'p'+taskId} onClick={Task.RequestedTask.bind(this, x, y, info, taskId, props)} ><Point className={classes.iconHover} style={pointStyle} /> </div>:
          props.value.status === 'New' ? <div id={'p'+taskId} onClick={Task.NewTask.bind(this, x, y, info)} ><Point className={classes.iconHover} style={pointStyle} /></div> :
            props.value.status === 'Assigned' ? <div id={'p'+taskId} onClick={Task.AssignedTask.bind(this, x, y, info)} ><Point className={classes.iconHover} style={pointStyle} /></div> :
            props.value.status === 'Reject' ? <div id={'p'+taskId} onClick={Task.RejectedTask.bind(this,x,y,info)}><Point className={classes.iconHover} style={pointStyle} /></div> :
            <div id={'p'+taskId} onClick={handleOpen} ><Point className={classes.iconHover} style={pointStyle} /></div>
      }
    </div>
  );
}
