import React from 'react';
import { Pannellum } from "pannellum-react";
import Fullscreen from "react-full-screen";
import '../../assets/css/viewer.css';
import Url from '../util/Url';

import '../../assets/css/viewer.css'

import Thumbnail from '../thumbnail/Thumbnail'

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.panImage = React.createRef();
    this.state = {
      isFull: false,
      rotate: 0,
    }
    if (this.props.source !== "uploader")
      this.getData(this.props.taskId);
    else
      this.state = { img: this.props.img, x: this.props.x, y: this.props.y, info: this.props.info }
  }

  getData(id) {
    fetch(Url.getHotspots + id)
      .then((r) => r.json()
        .then((data) => {
          if (data.Hotspot !== null) {
            let arr = [];
            Object.keys(data.Hotspot).forEach(function (key) {
              arr.push(data.Hotspot[key]);
            });
            let points = arr.map(item => <Pannellum.Hotspot
              key={item.DestjobID}
              type="custom"
              pitch={item.Pitch}
              yaw={item.Yaw}
              handleClick={(evt, args) => this.hanldeClickImage(evt, args)}
              handleClickArg={{ "id": item.DestjobID }}
              tooltip={(hotSpotDiv, args) => this.hanldeToolTip(hotSpotDiv, args)}
              tooltipArg={{ 'message': item.Message }}
              cssClass="custom-hotspot"
            />);
            this.setState({ taskId: data.ID, img: data.Img, hotspots: points, x: data.X, y: data.Y, info: data.Info });
          } else {
            this.setState({ taskId: data.ID, img: data.Img, hotspots: [], x: data.X, y: data.Y, info: data.Info });
          }
        })).catch(e => console.log('error: ' + e));
  }
  goFull = () => {
    this.state.isFull ? this.setState({ isFull: false }) : this.setState({ isFull: true });
  }
  hanldeClickImage = (evt, args) => {
    this.getData(args.id);
  };
  hanldeToolTip = (hotSpotDiv, args) => {
    hotSpotDiv.classList.add('custom-tooltip');
    let span = document.createElement('span');
    span.innerHTML = args.message;
    hotSpotDiv.appendChild(span)
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    span.style.marginTop = -span.scrollHeight - 12 + 'px';
  };
  handleMouseUp = (e) => {
    let elements = document.getElementsByClassName('pnlm-about-msg');
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    if (e.button === 2)
      alert('pitch: ' + this.panImage.current.getViewer().mouseEventToCoords(e)[0] + ', yaw: ' + this.panImage.current.getViewer().mouseEventToCoords(e)[1])
  }

  handlePanUp = () => {
    this.panImage.current.getViewer().setPitch(this.panImage.current.getViewer().getPitch() + 10);
  }

  handlePanDown = () => {
    this.panImage.current.getViewer().setPitch(this.panImage.current.getViewer().getPitch() - 10);
  }

  handlePanLeft = () => {
    this.panImage.current.getViewer().setYaw(this.panImage.current.getViewer().getYaw() - 10);
  }

  handlePanRight = () => {
    this.panImage.current.getViewer().setYaw(this.panImage.current.getViewer().getYaw() + 10);
  }

  handleZoomIn = () => {
    this.panImage.current.getViewer().setHfov(this.panImage.current.getViewer().getHfov() - 10);
  }

  handleZoomOut = () => {
    this.panImage.current.getViewer().setHfov(this.panImage.current.getViewer().getHfov() + 10);
  }

  render() {
    // const style = {
    //   width: '50%',
    //   height: '50%',
    // }

    // const style1 = {
    //   width: '50px',
    //   height: '50px',
    // }
    return (
      <div className="viewer">
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}>
          <Pannellum
            ref={this.panImage}
            width="100%"
            height="100%"
            image={this.state.img}
            pitch={6}
            yaw={60}
            hfov={100}
            autoLoad
            showControls={false}
            onMouseup={e => this.handleMouseUp(e)}
          >
            {this.state.hotspots}
          </Pannellum>
          <div id="controlbar">
            <div id="pan-up" className="ab-controls pnlm-zoom-controls pnlm-controls" onClick={this.handlePanUp}>&#9650;</div>
            <div id="pan-down" className="ab-controls pnlm-zoom-controls pnlm-controls" onClick={this.handlePanDown}>&#9660;</div>
            <div id="pan-left" className="ab-controls pnlm-zoom-controls pnlm-controls" onClick={this.handlePanLeft}>&#9664;</div>
            <div id="pan-right" className="ab-controls pnlm-zoom-controls pnlm-controls" onClick={this.handlePanRight}>&#9654;</div>
            <div id="zoom-in" className="ab-controls pnlm-zoom-controls pnlm-controls" onClick={this.handleZoomIn}>&#43;</div>
            <div id="zoom-out" className="ab-controls pnlm-zoom-controls pnlm-controls" onClick={this.handleZoomOut}>&#45;</div>
            <div id="fullscreen" className="ab-controls pnlm-zoom-controls pnlm-controls" onClick={this.goFull}>&#x2922;</div>
            <div id="music-toggle" className="ab-controls pnlm-zoom-controls pnlm-controls"><span role="img" aria-label="pin">&#128205;</span></div>
          </div>
          <div id="thumbnail_div">
            <Thumbnail />
          </div>
          <div className="photo-info">
            <h2 id="simple-modal-title">Current point position: </h2>
            <p id="simple-modal-description">
              x: {this.state.x} y: {this.state.y}
            </p>
            <p> Photo Info: {this.state.info}</p>
          </div>
        </Fullscreen>
        <br />
        {/* <button onClick={() => console.log('Pitch: ' + this.panImage.current.getViewer().getPitch() + ' Yaw: ' + this.panImage.current.getViewer().getYaw() + ' Hfov: ' + this.panImage.current.getViewer().getHfov())}>get 360 info</button> */}
      </div>
    );
  }
}