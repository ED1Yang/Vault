import React from 'react';
import { Pannellum } from "pannellum-react";
import Fullscreen from "react-full-screen";
import '../../assets/css/viewer.css'
import Url from '../util/Url';

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
    this.state={isFull: false,}
    if(this.props.source !== "uploader")
      this.getData(this.props.taskId);
    else
      this.state={img: this.props.img}
  }
  getData(id) {
    fetch(Url.getHotspots + id)
      .then((r) => r.json()
        .then((data) => {
          if(data.Hotspot !== null){
            let arr = [];
            Object.keys(data.Hotspot).forEach(function(key) {
              arr.push(data.Hotspot[key]);
            });
            let points = arr.map(item => <Pannellum.Hotspot
              key = {item.DestjobID}
              type="custom"
              pitch={item.Pitch}
              yaw={item.Yaw}
              handleClick={(evt , args) => this.hanldeClickImage(evt , args)}
              handleClickArg={{ "id": item.DestjobID }}
              tooltip={(hotSpotDiv , args) => this.hanldeToolTip(hotSpotDiv , args)}
              tooltipArg={{'message':item.Message}}
              cssClass="custom-hotspot"
            />);
            this.setState({taskId: data.ID, img: data.Img, hotspots: points});
          }else{
            this.setState({taskId: data.ID, img: data.Img, hotspots: []});
          }
        })).catch(e => console.log('error: ' + e));
  }
  goFull = () => {
    this.setState({ isFull: true });
  }
  hanldeClickImage = (evt, args) => {
    this.getData(args.id);
  };
  hanldeToolTip = (hotSpotDiv , args) => {
    hotSpotDiv.classList.add('custom-tooltip');
    let span = document.createElement('span');
    span.innerHTML = args.message;
    hotSpotDiv.appendChild(span)
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    span.style.marginTop = -span.scrollHeight - 12 + 'px';
  };
  handleMouseDown = (e) =>{
    console.log('add: '+this.panImage.current.getViewer().mouseEventToCoords(e));
  }
  render() {
    return (
      <div>
        <button onClick={this.goFull}>
          Go Fullscreen
        </button>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}>
          <Pannellum
            ref={this.panImage}
            width="100%"
            height={this.state.isFull ? "100%" : "600px"}
            image={this.state.img}
            pitch={6}
            yaw={60}
            hfov={100}
            autoLoad
            showFullscreenCtrl={false}
            onMousedown={e => this.handleMouseDown(e)}
          >
            {this.state.hotspots}
          </Pannellum>
          <div id="music-toggle" className="pnlm-zoom-controls pnlm-controls" style={style}>&#9834;</div>
        </Fullscreen>
        <br/>
        <button onClick={() => console.log('Pitch: '+this.panImage.current.getViewer().getPitch()+' Yaw: '+this.panImage.current.getViewer().getYaw()+' Hfov: '+this.panImage.current.getViewer().getHfov())}>get 360 info</button>
      </div>
    );
  }
}