import React from 'react';
import { Pannellum } from "pannellum-react";
import Fullscreen from "react-full-screen";
// import myImage1 from "../image/test1.png";
// import myImage2 from "../image/test2.png";

const style = {
  position: 'absolute',
        top: 5+'px',
        left: 80+'px',
        width: 26+'px',
        height: 26+'px',
        textAlign: 'center',
}

export default class ImageDemo extends React.Component {

  constructor(props) {
    super(props);
    this.panImage = React.createRef()
    this.img = this.props.img;
    this.state={
      isFull: false,
    }
  }

  getData() {
    fetch('http://localhost/api/client/2')
      .then((r) => r.json()
        .then((data) => {
          this.setState({ points: data, isFull: this.state.isFull });
        }));
  }

  goFull = () => {
    this.setState({ isFull: true });
  }
  // SaveUserView(){
  //   let user_pitch=this.panImage.current.getViewer().getPitch();
  //   let user_yaw=this.panImage.current.getViewer().getYaw();
  //   let user_hfov=this.panImage.current.getViewer().getHfov();
  // }

  render() {
    return (
      <div>
        <h1>360 Photo Viewer</h1>
        
        <button onClick={this.goFull}>
          Go Fullscreen
        </button>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
        
        <Pannellum
          ref={this.panImage}
          width="100%"
          height={this.state.isFull ? "100%" : "600px"}
          image={this.img}
          pitch={6}
          yaw={60}
          hfov={100}
          author='me'
          title='hello World'
          autoLoad
          showFullscreenCtrl={false}
        >
        <Pannellum.Hotspot
          type="custom"
          pitch={31}
          yaw={150}
          handleClick={(evt , args) => console.log(args.name)}
          handleClickArg={{ "name":"test" }}/>
          {/* <Pannellum.Hotspot
            type="info"
            pitch={11}
            yaw={-167}
            text="Info Hotspot Text 3"
            URL="https://github.com/ED1Yang/Vault"
          /> */}
        </Pannellum>
        <div id="music-toggle" className="pnlm-zoom-controls pnlm-controls" style={style}>&#9834;</div>
        </Fullscreen>
        <br/>
        {/* <div id="panorama"><div id="music-toggle" className="pnlm-controls" style={style}>&#9834;</div></div> */}
        <button onClick={() => console.log('Pitch: '+this.panImage.current.getViewer().getPitch()+' Yaw: '+this.panImage.current.getViewer().getYaw()+' Hfov: '+this.panImage.current.getViewer().getHfov())}>get 360 info</button>
      </div>
    );
  }
}