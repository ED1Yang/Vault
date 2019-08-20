import React from 'react';
import './App.css';
import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import './css/popup.css'
import Popup from 'react-popup';
import Prompt from './component/Prompt';

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
    // margin: theme.spacing(2),
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

function Icons(props) {
  let x = props.value.x;
  let y = props.value.y;

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
          {img()}
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setPosition = this.setPosition.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.changetoEditMode = this.changetoEditMode.bind(this);
    this.changetoReviewMode = this.changetoReviewMode.bind(this);
    this.insertMarker = this.insertMarker.bind(this);
    this.addNewPoint = this.addNewPoint.bind(this);
    this.state = {
      x: "",
      y: "",
      isEditMode: false,
      points: [],
      message: "",
    };
  }

  getData() {
    fetch('http://localhost/api/client/2')
      .then((r) => r.json()
        .then((data) => {
          this.setState({ points: data });
        }));
  }
  componentDidMount() {
    this.getData()
  }

  displayPoints = () => {
    return this.state.points.map((point) => {
      return this.showOnePoint(point.ID, point.Lat, point.Lon, point.Img);
    }
    )
  }

  showOnePoint(key, x, y, img) {
    let pointStyle = {
      color: 'green',
      // set center of the point to the coordinates
      left: x - 12 + 'px',
      top: y - 12 + 'px',
    }
    return (
      <div className='currentPoints' style={pointStyle} key={key}>
        <Icons value={{
          x: x,
          y: y,
          img: img,
        }} />
      </div>
    )
  }

  setPosition(e) {
    if (this.state.isEditMode)
      this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  handleOnClick() {
    return console.log('X is: ' + this.state.x + ' Y is: ' + this.state.y);
  }

  insertMarker() {
    if (this.state.isEditMode && this.state.x !== "") {
      const markerStyle = {
        color: 'goldenrod',
        // set center of the point to the coordinates
        left: this.state.x - 12 + 'px',
        top: this.state.y - 12 + 'px',
      }
      return <div className='marker' style={markerStyle}>
        <Icons value={{
          x: this.state.x,
          y: this.state.y,
          img: '',
        }} />
      </div>
    }
  }

  changetoEditMode() {
    this.setState({ isEditMode: true });
    console.log('changed to edit');
  }

  changetoReviewMode() {
    this.setState({ isEditMode: false });
    this.setState({ x: "", y: "" });
    console.log('changed to review');
  }

  addNewPoint() {
    let x = this.state.x;
    let y = this.state.y;
    let feedback = "";
    /** Prompt plugin */
    Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
      let promptValue = null;
      let promptChange = function (value) {
        promptValue = value;
      };
      this.create({
        title: 'Confirmation window',
        content: <Prompt onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
        buttons: {
          left: ['cancel'],
          right: [{
            text: 'Submit',
            key: '⌘+s',
            className: 'success',
            action: function () {
              let formData = new FormData();
              formData.append('latitude', x)
              formData.append('longitude', y)
              formData.append('info', promptValue)
              formData.append('user_id', '2')
              fetch('http://localhost/api/client',
                { method: 'POST', body: formData }
              )
                .then(res => res.json())
                .then(data => {
                  feedback = data.Message;
                  callback(feedback);
                  Popup.close();
                  console.log("1");
                  this.props.parent.getData();
                  console.log("2");
                  this.props.parent.displayPoints();
                  this.props.parent.setState({ x: '', y: '' });
                })
                .catch(e => console.log('error:', e))
            }
          }]
        }
      });
    });
    /** Call the plugin */
    Popup.plugins().prompt('', 'extra information', function (value) {
      alert('feedback: ' + value);
    });
  }

  render() {
    return <div className="container" >
      <div className='main_div'>
        <div className='map'>
          <img
            alt='map'
            src="https://www.livebakerblock.com/wp-content/uploads/2017/07/baker-plan-c1-1600px.png"
            onClick={this.setPosition}
          />
        </div>
        {this.displayPoints()}
        {this.insertMarker()}
      </div>
      <div className='panel'>
        <input type='button' value='Review' onClick={this.changetoReviewMode} />
        <input type='button' value='Edit' onClick={this.changetoEditMode} />
        {this.state.isEditMode && this.state.x !== "" && <input type='button' value='Submit' onClick={this.addNewPoint} />}
        <h1>{this.state.x} {this.state.y}</h1>
      </div>
      <Popup parent={this} />
    </div>
      ;
  }
}
export default App;
