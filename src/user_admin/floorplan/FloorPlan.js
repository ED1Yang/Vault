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
import Main from '../main/Main'
//css
import '../../assets/css/popup.css';
import '../../assets/css/floorplan.css';
//images
import floorPlan from '../../assets/images/Ground_floor.png';
//util
import Url from '../../components/Url';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    // fontSize:'10px',
    // width:'10px',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
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
      show: false,
      // 9/12 is 0.75. two grids: 9 + 3.
      rate: 0.75,
      loaded: false,
    };
  }

  componentDidMount(){
    // trigger setRate() when screen scale changed.
    window.addEventListener("resize", this.setRate.bind(this));
    this.setRate();
  }

  setRate() {
    let photo = document.getElementById('main_map');

    let changeRate = photo.width / photo.naturalWidth;
    console.log('rate: ' + changeRate);
    this.setState({ loaded: true, rate: changeRate, });
  }

  onRef = (ref) => {
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
        }} parent={this} />
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
    /** Call the plugin */
    Popup.plugins().prompt('', 'extra information', function (value) {
      Popup.alert('feedback: ' + value);
    });
  }

  render() {
    const contents = <div className="container">
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <div className='main_div'>
            <img
              id='main_map'
              alt='map'
              src={floorPlan}
              onLoad={() => this.setRate()}
              onClick={this.setPosition}
              onChange={() => this.setRate()}
            />
            <ShowPoints onRef={this.onRef} rate={this.state.rate} />
            {this.insertMarker()}
          </div>


        </Grid>

        <Grid item xs={3}>
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
                {/* <Grid item>Edit</Grid> */}
              </Grid>
            </Typography>
            {this.state.isEditMode && this.state.x !== "" &&
              <div>
                <Fab color="primary" aria-label="add" className={useStyles.fab} onClick={this.addNewPoint}><AddIcon /></Fab>
                <p>Relative coordinates: {this.state.x} {this.state.y}</p>
              </div>
            }
          </div>
          <Popup parent={this} />
        </Grid>
      </Grid>
    </div>
    return <Main value={contents} />
  }
}
export default FloorPlan;
