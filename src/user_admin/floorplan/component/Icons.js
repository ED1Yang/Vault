import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import Point from '@material-ui/icons/FiberManualRecord'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Popup from 'react-popup';
import Viewer from './Viewer';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Url from '../../../components/Url';

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
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
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
  let empId = '';
  let x = props.value.x;
  let y = props.value.y;
  let info = props.value.info;

  const classes = useStyles();
  const [modalStyle] = React.useState(centerModal);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({empid: '',});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = empid => event => {
    empId = event.target.value;
    setState({
      empid: event.target.value,
    });
  };

  function RequestedTask() {
    Popup.create({
      title: 'Requested task from client',
      content: <div>
        <p>{x}  {y}</p>
        <p className="taskInfo">{info}</p>
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
            Popup.alert('Task has been rejected');
            props.getdata();
            props.displaypoints();
            Popup.close();
          }
        }, {
          text: 'Delete',
          key: 'delete',
          action: function () {
            if (window.confirm('Are you sure you wish to delete this task?')) {
            fetch(Url.setStatus + taskId + '/Deleted',
              { method: 'PUT', }
            )
              .then(res => res.json())
              .catch(e => console.log('error:', e))
            Popup.alert('Task has been deleted');
            props.getdata();
            props.displaypoints();
            Popup.close();
          }
        }
        }],
        right: [{
          text: 'Approve',
          key: 'enter',
          className: 'success',
          action: function () {
            fetch(Url.setStatus + taskId + '/New',
              { method: 'PUT', }
            )
              .then(res => res.json())
              .catch(e => console.log('error:', e));
            Popup.alert('Task has been approved');
            props.getdata();
            props.displaypoints();
            Popup.close();
          }
        }]
      }
    });
  }

  function RejectedTask() {
    Popup.create({
      title: 'Rejected task',
      content: <div>
        <p>{x}  {y}</p>
        <p className="taskInfo">{info}</p>
      </div>,
      buttons: {
        left: [{
          text: 'Delete',
          className: 'danger',
          key: 'delete',
          action: function () {
            if (window.confirm('Are you sure you wish to delete this task?')) {
            fetch(Url.setStatus + taskId + '/Deleted',
              { method: 'PUT', }
            )
              .then(res => res.json())
              .catch(e => console.log('error:', e))
            Popup.alert('Task has been deleted');
            props.getdata();
            props.displaypoints();
            Popup.close();
          }
        }
        }],
        right: [{
          text: 'Reactive',
          key: 'enter',
          className: 'success',
          action: function () {
            fetch(Url.setStatus + taskId + '/Requested',
              { method: 'PUT', }
            )
              .then(res => res.json())
              .catch(e => console.log('error:', e));
            Popup.alert('Task has been reactived');
            props.getdata();
            props.displaypoints();
            Popup.close();
          }
        }]
      }
    });
  }

  function DeletedTask() {
    Popup.create({
      title: 'Deleted task',
      content: <div>
        <p>{x}  {y}</p>
        <p className="taskInfo">{info}</p>
      </div>,
      buttons: {
        left: [{
          text: 'New',
          action: function () {
            fetch(Url.setStatus + taskId + '/New',
              { method: 'PUT', }
            )
              .then(res => res.json())
              .catch(e => console.log('error:', e))
            Popup.alert('Task has been reactivated to the status New');
            props.getdata();
            props.displaypoints();
            Popup.close();
          }
        }],
        right: [{
          text: 'Done',
          key: 'enter',
          className: 'success',
          action: function () {
            fetch(Url.setStatus + taskId + '/Done',
              { method: 'PUT', }
            )
              .then(res => res.json())
              .catch(e => console.log('error:', e));
            Popup.alert('Task has been reactivated to the status Done');
            props.getdata();
            props.displaypoints();
            Popup.close();
          }
        }]
      }
    });
  }

  function AssignTask() {
    let empList=[];
    fetch(Url.getAllEmp,
      { method: 'GET'}
    )
      .then(res => res.json())
      .then(data => {
        empList = data;
        Popup.create({
          title: 'Assign task',
          content: <div>
            <p>{x}  {y}</p>
            <p className="approveTaskInfo">{info}</p>
            <FormControl required className={classes.formControl}>
              <InputLabel htmlFor="emp-native-required">Employee</InputLabel>
                <Select
                  native
                  value={state.emp}
                  onChange={handleChange('emp')}
                  name="emp"
                  inputProps={{
                    id: 'emp-native-required',
                  }}
                >
                  <option value="" />
                  {empList.map(emp => <option key={emp.ID} value={emp.ID}>{emp.Name}</option>)}
                </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </div>,
          buttons: {
            left: [{
              text: 'Cancel',
              className: 'danger',
              action: function () {
                Popup.close();
              }
            }],
            right: [{
              text: 'Submit',
              className: 'success',
              action: function () {
                //approve function here.
                let formData = new FormData();
                formData.append('empid', empId);
                formData.append('jobid', taskId);
                fetch(Url.assignTask,
                  { method: 'POST', body: formData}
                )
                  .then(res => res.json())
                  .catch(e => console.log('error:', e));
                alert('Task has been assigned');
                props.getdata();
                props.displaypoints();
                Popup.close();
              }
            }]
          }
        })
      })
    .catch(e => console.log('error:', e));
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
                setRate={props.setRate} />
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
        {props.value.status === 'Requested' ? <Point className={classes.iconHover} onClick={RequestedTask} style={pointStyle} /> :
          props.value.status === 'New' ? <Point className={classes.iconHover} onClick={AssignTask} style={pointStyle} /> :
            props.value.status === 'Reject' ? <Point className={classes.iconHover} onClick={RejectedTask} style={pointStyle} /> :
            props.value.status === 'Deleted' ? <Point className={classes.iconHover} onClick={DeletedTask} style={pointStyle} /> :
              <Point className={classes.iconHover} onClick={handleOpen} style={pointStyle} />
        }
      </div>
  );
}
