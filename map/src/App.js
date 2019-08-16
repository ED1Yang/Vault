import React from 'react';
import './App.css';
import {Icon} from '@material-ui/core';

const testPoints = [];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.setPosition=this.setPosition.bind(this);
    this.handleOnClick=this.handleOnClick.bind(this);
    this.changetoEditMode=this.changetoEditMode.bind(this);
    this.changetoReviewMode=this.changetoReviewMode.bind(this);
    this.insertMarker=this.insertMarker.bind(this);
    this.state = {
      x: 0, 
      y: 0, 
      isEditMode:false,
    };
  }

  componentDidMount(){
    this.getRandomPoints();
       
  }

  getRandomPoints(){
    for(let i=0;i<10;i++){
      testPoints.push({
        x:Math.floor(Math.random()*(200)+50),
        y:Math.floor(Math.random()*(200)+50),
      });
    }
    console.log(testPoints)
  }

  showOnePoint(x,y){
    let pointStyle={
      color:'green',
      // set center of the point to the coordinates
      left:x-12+'px',
      top:y-12+'px',
    }
    return(
        <div className='currentPoints' style={pointStyle}>
            <Icon>fiber_manual_record</Icon>
            {console.log(pointStyle)}
        </div>
        
    )}

  showTest(){
      return (
        <div>
          {this.showOnePoint(100,100)}
          {this.showOnePoint(200,200)}
        </div>
      )}

  showAllPoints(){
    let points="";
    for(let j=0;j<testPoints.length;j++){
        points = points + this.showOnePoint(testPoints[j].x,testPoints[j].y)
    }
    return (<div>{points}</div>
    )}

  setPosition(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  handleOnClick(){
    return console.log('X is: '+this.state.x+' Y is: '+this.state.y);
  }

  insertMarker(){
    const markerStyle={
      color:'goldenrod',
      // set center of the point to the coordinates
      left:this.state.x-12+'px',
      top:this.state.y-12+'px',
    }
    // console.log('X is: '+this.state.x+' Y is: '+this.state.y);
    if(this.state.isEditMode){
    return <div id='point-id' style={markerStyle}>
      <Icon>fiber_manual_record</Icon>
    </div>
  }
  }

  changetoEditMode(){
    this.setState({isEditMode: true});
    console.log('changed to edit')
  }

  changetoReviewMode(){
    this.setState({isEditMode: false});
    console.log('changed to review')
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
        {/* {this.showOnePoint(100,200)} */}
        {this.showAllPoints()}
        {this.insertMarker()}
      </div>
      <div id='coordinate'>
        <h1>{ this.state.x } { this.state.y }</h1>
        <input type='button' value='Review' onClick={this.changetoReviewMode}/>
        <input type='button' value='Edit'  onClick={this.changetoEditMode}/>
      </div>
    </div>
    ;
  }
}
export default App;
