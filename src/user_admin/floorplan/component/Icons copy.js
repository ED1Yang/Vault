import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import Point from '@material-ui/icons/FiberManualRecord'
import Popup from 'react-popup';
import Url from '../../../components/Url';


import Viewer from './Viewer';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";


// import Tasks from './Tasks'

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
    textAlign: 'center',
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
  // let parent = props.parent;
  let status = props.value.status;
  let x = props.value.x;
  let y = props.value.y;
  let info = props.value.info;
  let taskId = props.value.taskId;


  const classes = useStyles();
  const [modalStyle] = React.useState(centerModal);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function RequestedTask() {
    Popup.create({
      title: 'Requested task from client',
      content: <div>
        <p>{x}  {y}</p>
        <p className="approveTaskInfo">{info}</p>
      </div>,
      buttons: {
        left: [{
          text: 'Reject',
          className: 'danger',
          action: function () {
            fetch(Url.setStatus + taskId + '/Reject',
              { method: 'PUT', }
            )
              .then(res => res.json())
              .catch(e => console.log('error:', e))
            alert('Task has been rejected');
            //not sure if this works...
          }
        }],
        right: [{
          text: 'Approve',
          key: '⌘+s',
          className: 'success',
          action: function () {
            //approve function here.
            fetch(Url.setStatus + taskId + '/New',
              { method: 'PUT', }
            )
              .then(res => res.json())
              .catch(e => console.log('error:', e))
            alert('Task has been approved');
            //not sure if this works...
          }
        }]
      }
    });
  }



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

  // function showTask() {
  //   if (status === 'Requested') {
  //     return <Point className={classes.iconHover} onClick={console.log('123')} style={pointStyle} />
  //   } else {
  //     return <div className={classes.root}>
  //       <Modal className='modals'
  //         aria-labelledby="simple-modal-title"
  //         aria-describedby="simple-modal-description"
  //         open={open}
  //         onClose={handleClose}
  //       >
  //         <div style={modalStyle} className={classes.paper}>
  //           <Viewer taskId={taskId} floorID={props.floorID} floorplan={props.floorplan} photoInfo={props.photoInfo} />
  //           {/* close button */}
  //           <IconButton
  //             style={closeButtonStyle}
  //             key="close"
  //             aria-label="Close"
  //             color="inherit"
  //             onClick={handleClose}
  //           >
  //             <Close />
  //           </IconButton>
  //         </div>
  //       </Modal>
  //       {/* {parent.state.show ? <Point className={classes.iconHover} onClick={handleOpen}/> : <Point className={classes.iconHover}/>} */}
  //       {/* 0903: for test purpose~~~ */}
  //       <Point className={classes.iconHover} onClick={handleOpen} style={pointStyle} />
  //     </div>
  //   }
  // }

  return (
    <div>
    {status === 'Requested'?
   <Point className={classes.iconHover} onClick={console.log('123')} style={pointStyle} />: <div className={classes.root}>
        <Modal className='modals'
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Viewer taskId={taskId} floorID={props.floorID} floorplan={props.floorplan} photoInfo={props.photoInfo} />
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
        <Point className={classes.iconHover} onClick={handleOpen} style={pointStyle} />
      </div>}
    </div>
  );
}
