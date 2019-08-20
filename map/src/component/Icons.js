import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import { Icon } from '@material-ui/core';
import Viewer from './Viewer'
import { Pannellum } from "pannellum-react";

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
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
      //customized:
      color: 'green',
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
    let x = props.value.x;
    let y = props.value.y;
    const getPicInfo = () =>{
      console.log("1")
      let test = Pannellum.current
      console.log(test);
    }
    const img = () => {
      if (props.value.img === '') {
        return <p style={{ color: 'red' }}>No image yet</p>
      }
      else {
        return <img alt='360photo' src={props.value.img}></img>
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
  
    return (
      <div className={classes.root}>
        <Modal className='modals'
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Viewer/>
            {img()}
            <button onClick={getPicInfo}>click</button>
            <h2 id="simple-modal-title">Current point position:</h2>
            <p id="simple-modal-description">
              x: {x} y: {y}
            </p>
          </div>
        </Modal>
        <Icon className={classes.iconHover} onClick={handleOpen}>
          fiber_manual_record
        </Icon>
      </div>
    );
  }
