import React from 'react';
import Popup from 'react-popup';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
//controlPanel
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
//components
import Icons from './component/Icons';
import ShowPoints from './component/ShowPoints';
import Main from '../main/Main';
import PointList from '../../components/PointList';
//css
import '../../assets/css/popup.css';
import '../../assets/css/floorplan.css';
//util
import Url from '../../components/Url';
import Cookies from 'universal-cookie';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

const cookie = new Cookies();

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: "",
      y: "",
      isEditMode: false,
      points: [],
      show: false,
      // 10/12 is 0.83. two grids: 10 + 2.
      rate: 0,
      loaded: false,
      redirect: typeof this.props.location.state === 'undefined' ? true : false,
    };
    if(!this.state.redirect){
      this.setPosition = this.setPosition.bind(this);
      this.insertMarker = this.insertMarker.bind(this);
      this.addNewPoint = this.addNewPoint.bind(this);
      this.handleModeChange = this.handleModeChange.bind(this);
      this.setRate = this.setRate.bind(this);
    }
  }

  componentDidMount() {
    // trigger setRate() when screen scale changed.
    if(!this.state.redirect){
      window.addEventListener("resize", this.setRate);
      this.setRate();
    }
  }

  componentWillUnmount() {
    if(!this.state.redirect){
      window.removeEventListener("resize", this.setRate);
      this.setState = (state, callback) => {
        return;
      };
    }
  }

  setPoints = (points) =>{
    this.setState({points: points});
  }

  setRate() {
    let photo = document.getElementById('main_map');
    if (this.state.loaded && photo) {
      this.setState({ rate: photo.width / photo.naturalWidth, photoInfo: { naturalWidth: photo.naturalWidth, naturalHeight: photo.naturalHeight } });
    } else {
      this.setState({ loaded: true, });
    }
  }

  onRef = (ref) => {
    this.showPoints = ref;
  }

  setPosition(e) {
    if (this.state.isEditMode)
      this.setState({ x: Math.round(e.nativeEvent.offsetX / this.state.rate), y: Math.round(e.nativeEvent.offsetY / this.state.rate) });
  }

  insertMarker() {
    if (this.state.isEditMode && this.state.x !== "") {
      const markerStyle = {
        color: 'goldenrod',
        // set center of the point to the coordinates
        left: (this.state.x - 12) * this.state.rate + 'px',
        top: (this.state.y - 12) * this.state.rate + 'px',
      }
      return <div className='marker' style={markerStyle}>
        <Icons
          value={{
            x: this.state.x,
            y: this.state.y,
            img: '',
            rate: this.state.rate,
            newPoint: true,
          }}
          parent={this} />
      </div>
    }
  }

  handleModeChange() {
    if (this.state.isEditMode === false) {
      this.setState({ isEditMode: true })
    }
    else {
      this.setState({ isEditMode: false, x: '', y: '' })
    }
  }

  addNewPoint(classes) {
    let x = this.state.x;
    let y = this.state.y;
    Popup.create({
      title: 'Add new task',
      content: <form className={classes.container} noValidate autoComplete="off">
              <TextField
          id="outlined-multiline-static"
          multiline
          rows="4"
          placeholder="task info here..."
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        </form>
        ,
      buttons: {
        left: [{
          text: 'Cancel',
          className: 'danger',
          action: function () {
            Popup.close();
          }
        }],
        right: [{
          text: 'Create',
          key: '⌘+s',
          className: 'success',
          action: function () {
            let formData = new FormData();
            formData.append('latitude', x)
            formData.append('longitude', y)
            formData.append('info', document.getElementById('outlined-multiline-static').value)
            formData.append('emp_id', cookie.get('userID'))
            formData.append('floor_id', this.props.parent.props.location.state.floorID)

            fetch(Url.addNewPointEmp,
              { method: 'POST', body: formData }
            )
              .then(res => res.json())
              .then(data => {
                alert(data.Message);
                Popup.close();
                this.props.parent.showPoints.getData();
                this.props.parent.showPoints.displayPoints();
                this.props.parent.setState({ x: '', y: '' });
              })
              .catch(e => console.log('error:', e))
          }
        }]
      }
    });
}

render() {
  const { classes } = this.props;
  const contents = <div className="container">
    <Grid container spacing={3}>

      <Grid item xs={10}>
        <div className='main_div'>
          <img
            id='main_map'
            alt='map'
            src={this.state.redirect ? null : this.props.location.state.floorplan}
            onLoad={() => this.setRate()}
            onClick={this.setPosition}
          />
          <ShowPoints setPoints={this.setPoints} setRate={this.setRate} photoInfo={this.state.photoInfo} rate={this.state.rate} onRef={this.onRef} floorID={this.state.redirect ? null : this.props.location.state.floorID} floorplan={this.state.redirect ? null : this.props.location.state.floorplan} />
          {this.insertMarker()}
        </div>
      </Grid>

      <Grid item xs={2}>
        <p>Control Panel</p>
         <div className='panel'>
          <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
            <ListItem>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-wifi" primary="Edit Mode" />
              <ListItemSecondaryAction>
                <Switch
                  color="primary"
                  onChange={this.handleModeChange}
                  value={this.state.isEditMode}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          {this.state.isEditMode && this.state.x !== "" &&
            <div>
              <Button variant="contained" color="primary" className={classes.button} onClick={this.addNewPoint.bind(this,classes)}>
                <Icon className={classes.leftIcon}>add</Icon>
                Add New Point
                </Button>
              <p>Relative coordinates: {this.state.x} {this.state.y}</p>
            </div>
          }
          {this.state.points ===[] ? null : <PointList points={this.state.points}/> }
        </div>
      </Grid>
      <Popup parent={this} />
    </Grid>
  </div>
  return this.state.redirect ? <Redirect exact from="/" to="/employee/dashboard"/> : <Main value={contents}/>
}
}

FloorPlan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloorPlan);
