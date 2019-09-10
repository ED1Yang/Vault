import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import Point from '@material-ui/icons/FiberManualRecordTwoTone'
import Viewer from './Viewer';
import ImageUploader from './ImageUploader';

import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";



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
  paper: {
    position: 'absolute',
    width: '85%',
    height: '80%',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 4),
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
  let parent = props.parent;
  let taskId = props.value.taskId;

  // let status = props.value.status;
  let x = props.value.x;
  let y = props.value.y;
  let info = props.value.info;
  const Content = () => {
    if (props.value.img === '') {
      return <ImageUploader taskId={taskId} parent={parent} x={x} y={y} info={info} />
    }
    else {
      return <Viewer taskId={taskId} />
    }
  }

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

  const pointStyle={
    fontSize: 24 * props.rate + 'px',
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

          <Content />
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
      {/* {parent.state.show ? <Point className={classes.iconHover} onClick={handleOpen}/> : <Point className={classes.iconHover}/>} */}
      {/* 0903: for test purpose~~~ */}
      <Point className={classes.iconHover} onClick={handleOpen} style={pointStyle}/>
    </div>
  );
}
