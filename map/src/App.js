import React from 'react';
import './App.css';
import {Icon} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

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
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
}));

function Icons() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Icon className={classes.iconHover}>
        fiber_manual_record
      </Icon>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setPosition=this.setPosition.bind(this);
    this.handleOnClick=this.handleOnClick.bind(this);
    this.changetoEditMode=this.changetoEditMode.bind(this);
    this.changetoReviewMode=this.changetoReviewMode.bind(this);
    this.changeMode=this.changeMode.bind(this);
    this.insertMarker=this.insertMarker.bind(this);
    this.addNewPoint=this.addNewPoint.bind(this);
    this.state = {
      x: 0, 
      y: 0, 
      isEditMode:false,
      points:[],
      message: "",
    };
  }

  componentDidMount(){
    fetch('http://localhost/api/client/2')
    .then((r)=>r.json()
    .then((data)=>{
      this.setState({ points: data });
    }));
  }

  displayPoints = () => {
    return this.state.points.map((point) =>{
      return this.showOnePoint(point.ID,point.Lat,point.Lon);
      }
    )
  }

  showOnePoint(key,x,y){
    let pointStyle={
      color:'green',
      // set center of the point to the coordinates
      left:x-12+'px',
      top:y-12+'px',
    }
    return(
        <div className='currentPoints' style={pointStyle} key={key}>
            <Icons /> 
        </div>
        
    )}

  setPosition(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  handleOnClick(){
    return console.log('X is: '+this.state.x+' Y is: '+this.state.y);
  }

  editPoint(){

  }

  insertMarker(){
    const markerStyle={
      color:'goldenrod',
      // set center of the point to the coordinates
      left:this.state.x-12+'px',
      top:this.state.y-12+'px',
    }
    // const classes = useStyles();
    if(this.state.isEditMode){
      return <div id='point-id' style={markerStyle} onClick={this.editPoint}>      
        <Icons />
      </div>
    }
  }

  changetoEditMode(){
    this.setState({isEditMode: true});
    console.log('changed to edit');
  }

  changetoReviewMode(){
    this.setState({isEditMode: false});
    console.log('changed to review');
  }

  changeMode(mode){
    this.setState({isEditMode: mode});
    mode=true? console.log('changed to edit mode'):console.log('changed to review mode');
    
  }

  addNewPoint(){
      let formData = new FormData();
      formData.append('latitude', this.state.x)
      formData.append('longitude', this.state.y)
      formData.append('information', 'test')
      formData.append('user_id', '2')
      fetch('http://localhost/api/client',
      {method: 'POST', body: formData}
      )
      .then(res => res.json())
      .then(data => {
      this.setState({message: data.Message})
      alert(this.state.message)
      window.location.reload(false)
      })
      .catch(e => console.log('error:', e))

      }
  
      render() {
    return <div  className="container" >
      <div id='main-id'>
        <div id='picture-id'>
          <img 
            alt='map'
            src="https://www.livebakerblock.com/wp-content/uploads/2017/07/baker-plan-c1-1600px.png"
            onClick={this.setPosition}
          />
        </div>
        {this.displayPoints()}
        {this.insertMarker()}
      </div>
      <div id='coordinate'>
        <h1>{ this.state.x } { this.state.y }</h1>
        <h4>{this.state.message.Message}</h4>
        <input type='button' value='Review' onClick={this.changetoReviewMode}/>
        <input type='button' value='Edit'  onClick={this.changetoEditMode}/>
        <input type='button' value='Submit'  onClick={this.addNewPoint}/>
      </div>
    </div>
    ;
  }
}
export default App;
