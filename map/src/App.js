import React from 'react';
import './App.css';
// import IconAvatars from './IconAvatars.js';
// import {Test} from './test.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this._onMouseMove=this._onMouseMove.bind(this);
    this.handleOnClick=this.handleOnClick.bind(this);
    this.state = { x: 0, y: 0 };
  }
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  handleOnClick(){
    return console.log('X is: '+this.state.x+' Y is: '+this.state.y);
  }

  // localtest(){
  //   return 'wow';
  // }

  // importTest(){
  //   this._child.Test();
  // }

  render() {
    const { x, y } = this.state;
    return <div className="container">
      <div >
        <img onMouseMove={this._onMouseMove} 
          alt='map'
          width="50%" 
          height="50%" 
          src="https://www.livebakerblock.com/wp-content/uploads/2017/07/baker-plan-c1-1600px.png"
          onClick={this.handleOnClick}
        />
      </div>
      <h1>{ x } { y }</h1><br/>
    </div>;
  }
}

export default App;
