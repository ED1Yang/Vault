import React from 'react';
import Popup from 'react-popup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AddCircle from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";

//components
import Prompt from './component/Prompt';
import Icons from './component/Icons';
import AntSwitch from './component/AntSwitch';
import ShowPoints from './component/ShowPoints';
import Main from '../main/Main'
//css
import '../../assets/css/popup.css';
import '../../assets/css/floorplan.css';
//util
import Url from '../../components/Url';
import Cookies from 'universal-cookie';


const cookie = new Cookies();

class FloorPlan extends React.Component {
  constructor(props) {
    super(props);
    this.setPosition = this.setPosition.bind(this);
    this.insertMarker = this.insertMarker.bind(this);
    this.addNewPoint = this.addNewPoint.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.setRate = this.setRate.bind(this);
    this.state = {
      x: "",
      y: "",
      isEditMode: false,
      points: [],
      show: false,
      // 10/12 is 0.83. two grids: 10 + 2.
      rate: 0,
      loaded: false,
    };
  }

  componentDidMount() {
    // trigger setRate() when screen scale changed.
    window.addEventListener("resize", this.setRate);
    this.setRate();
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.setRate);
    this.setState = (state,callback)=>{
      return;
    };
  }
  
  setRate() {
    let photo = document.getElementById('main_map');
    if(this.state.loaded&&photo){
      this.setState({ rate: photo.width / photo.naturalWidth, photoInfo:{naturalWidth: photo.naturalWidth, naturalHeight: photo.naturalHeight}});
    }else{
      this.setState({ loaded: true,});
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
        title: 'Add new task',
        content: <Prompt onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
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
            key: '⌘+s',
            className: 'success',
            action: function () {
              let formData = new FormData();
              formData.append('latitude', x)
              formData.append('longitude', y)
              formData.append('info', promptValue)
              formData.append('manager_id', cookie.get('userID'))
              formData.append('floor_id', this.props.parent.props.location.state.floorID)
              fetch(Url.addNewPoint,
                { method: 'POST', body: formData }
              )
                .then(res => res.json())
                .then(data => {
                  feedback = data.Message;
                  callback(feedback);
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
    });
    Popup.plugins().prompt('', 'Task information', function (value) {
      Popup.alert('feedback: ' + value);
    });
  }

  render() {
    const contents = <div className="container">
      <Grid container spacing={3}>

        <Grid item xs={10}>
          <div className='main_div'>
            <img
              id='main_map'
              alt='map'
              src={this.props.location.state.floorplan}
              onLoad={() => this.setRate()}
              onClick={this.setPosition}
            />
            <ShowPoints setRate={this.setRate} photoInfo={this.state.photoInfo} rate={this.state.rate} onRef={this.onRef} floorID={this.props.location.state.floorID} floorplan={this.props.location.state.floorplan}/>
            {this.insertMarker()}
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>Control Panel</p>
          <div className='panel'>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Edit Mode</Grid>
                <Grid item>
                  <AntSwitch
                    onChange={this.handleModeChange}
                    value={this.state.isEditMode}
                  />
                </Grid>
              </Grid>
            </Typography>
            {this.state.isEditMode && this.state.x !== "" &&
              <div>
                <Button
                  color="primary"
                  onClick={this.addNewPoint}
                >
                  <AddCircle />
                  <p>&nbsp;Add new task</p>
                </Button>
                <p>Relative coordinates: {this.state.x} {this.state.y}</p>
              </div>
            }
          </div>
          <Popup />
        </Grid>
        
      </Grid>
    </div>
    return <Main value={contents}/>
  }
}
export default FloorPlan;
