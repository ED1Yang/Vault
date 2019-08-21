import React from 'react';
import { Pannellum } from "pannellum-react";
// import myImage1 from "../image/test1.png";
// import myImage2 from "../image/test2.png";


export default class ImageDemo extends React.Component {

  constructor(props) {
    super(props);
    this.panImage = React.createRef()
    this.img = this.props.img;
  }
  render() {
    return (
      <div>
        <h1>360 Photo Viewer</h1>
        <Pannellum
          ref={this.panImage}
          width="100%"
          height="950px"
          image={this.img}
          pitch={6}
          yaw={60}
          hfov={100}
          autoLoad
        >
          <Pannellum.Hotspot
            type="info"
            pitch={11}
            yaw={-167}
            text="Info Hotspot Text 3"
            URL="https://github.com/ED1Yang/Vault"
          />
        </Pannellum>
        <br/><button onClick={() => console.log(this.panImage.current.getViewer().getHfov())}>get pitch</button>
      </div>
    );
  }
}