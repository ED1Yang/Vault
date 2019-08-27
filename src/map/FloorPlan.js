import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popup from 'react-popup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
//components
import Prompt from './component/Prompt';
import Icons from './component/Icons';
import AntSwitch from './component/AntSwitch';
import ShowPoints from './component/ShowPoints';
//css
import './css/popup.css';
import './css/map.css';
//images
import floorPlan from './image/Ground_floor.png';


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
}));

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);
    this.setPosition = this.setPosition.bind(this);
    this.insertMarker = this.insertMarker.bind(this);
    this.addNewPoint = this.addNewPoint.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.state = {
      x: "",
      y: "",
      isEditMode: false,
      points: [],
    };
  }
  onRef=(ref)=>{
    this.showPoints = ref;
  }

  setPosition(e) {
    if (this.state.isEditMode)
      this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
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

  handleModeChange() {
    if (this.state.isEditMode === false) {
      this.setState({ isEditMode: true })
    }
    else {
      this.setState({ isEditMode: false, x: '', y: ''})
    }
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
                  ShowPoints.testfunction();
                  this.props.parent.showPoints.displayPoints();
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
      Popup.alert('feedback: ' + value);
    });
  }

  render() {
    return <div className="container" >
      <div className='main_div'>
        <div className='map'>
          <img
            alt='map'
            src={floorPlan}
            onClick={this.setPosition}
          />
        </div>
        <ShowPoints onRef={this.onRef}/>
        {this.insertMarker()}
      </div>
      <div className='panel'>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Review</Grid>
            <Grid item>
              <AntSwitch
                onChange={this.handleModeChange}
                value={this.state.isEditMode}
              />
            </Grid>
            <Grid item>Edit</Grid>
          </Grid>
        </Typography>
        {this.state.isEditMode && this.state.x !== "" && <div>
        <Fab color="primary" aria-label="add" className={useStyles.fab} onClick={this.addNewPoint}><AddIcon /></Fab>
        <h1>{this.state.x} {this.state.y}</h1></div>}
      </div>
      <Popup parent={this} />
    </div>
  }
}
export default FloorPlan;