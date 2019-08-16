import React from 'react';
import './App.css';
import {Icon} from '@material-ui/core';
// import IconAvatars from './IconAvatars.js';
// import {Test} from './test.js'

let testPosition ={
  x:100,
  y:100,
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this._onMouseMove=this._onMouseMove.bind(this);
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
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  handleOnClick(){
    return console.log('X is: '+this.state.x+' Y is: '+this.state.y);
  }

  insertMarker(){
    const markerStyle={
      color:'blue',
      // set center of the point to the coordinates
      left:testPosition.x-12+'px',
      top:testPosition.y-12+'px',
    }
    // console.log('X is: '+this.state.x+' Y is: '+this.state.y);
    if(this.state.isEditMode){
    return <div id='point-id' style={markerStyle}>
      <Icon >star</Icon>
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
    // const { x, y } = this.state;
    return <div  className="container" >
      <div id='main-id'>
        <div id='picture-id'>
          <img onMouseMove={this._onMouseMove} 
            alt='map'
            src="https://www.livebakerblock.com/wp-content/uploads/2017/07/baker-plan-c1-1600px.png"
            onClick={this.handleOnClick}
            // onClick={this.insertMarker()}
          />
        </div>
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
