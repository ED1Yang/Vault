import React from 'react';
import { Pannellum } from "pannellum-react";
import Fullscreen from "react-full-screen";

import '../../../assets/css/viewer.css'

import Thumbnail from '../thumbnail/Thumbnail'
import Url from '../../../components/Url';

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.panImage = React.createRef();
    this.state = {
      rightClick: false,
      nextScene: '',
      newPitch: '',
      newYam: '',
      editHotSpot: false,
      isFull: false,
      rotate: 0,
      editPhoto: false,
      imgPitch: 6,
      imgYaw: 60,
      imgHfov: 100,
    }
    this.changeImage = this.changeImage.bind(this);
    this.addScenToNewHotspot = this.addScenToNewHotspot.bind(this);
    this.exitHandler = this.exitHandler.bind(this);
    if (this.props.source !== "uploader")
      this.getData(this.props.taskId);
    else
      this.state = { img: this.props.img, x: this.props.x, y: this.props.y, info: this.props.info }
  }

  componentDidMount() {
    document.addEventListener('contextmenu', this._handleContextMenu);
    document.addEventListener('fullscreenchange', this.exitHandler);
    document.addEventListener('webkitfullscreenchange', this.exitHandler);
    document.addEventListener('mozfullscreenchange', this.exitHandler);
    document.addEventListener('MSFullscreenChange', this.exitHandler);
  };

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);
    document.removeEventListener('fullscreenchange', this.exitHandler);
    document.removeEventListener('webkitfullscreenchange', this.exitHandler);
    document.removeEventListener('mozfullscreenchange', this.exitHandler);
    document.removeEventListener('MSFullscreenChange', this.exitHandler);
  }

  exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      window.addEventListener("resize", this.props.setRate);
    }
    this.props.setRate();
  }

  _handleContextMenu = (event) => {
    event.preventDefault();
  };


  changeImage(id) {
    this.getData(id);
  }

  check_devices(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      return false;
     else
      return true;
  }

  getData(id) {
    fetch(Url.getHotspots+id+'/'+this.check_devices())
    // fetch(Url.getHotspots+id)
      .then((r) => r.json()
        .then((data) => {
          if (data.Hotspot !== null) {
            let arr = [];
            Object.keys(data.Hotspot).forEach(function (key) {
              arr.push(data.Hotspot[key]);
            });
            let points = arr.map(item => <Pannellum.Hotspot
              key={item.DestjobID}
              id={item.DestjobID}
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
            //this.setState({ taskId: data.ID, hotspots: points, x: data.X, y: data.Y, info: data.Info, status: data.Status, imgPitch: data.Pitch, imgYaw: data.Yaw, imgHfov: data.Hfov, img: data.Img});
          } else {
            this.setState({ taskId: data.ID, img: data.Img, hotspots: [], x: data.X, y: data.Y, info: data.Info });
            //this.setState({ taskId: data.ID, hotspots: [], x: data.X, y: data.Y, info: data.Info, status: data.Status, imgPitch: data.Pitch, imgYaw: data.Yaw, imgHfov: data.Hfov, img: data.Img});
          }
        })).catch(e => console.log('error: ' + e));
  }

  goFull = () => {
    if (!this.state.isFull)
      window.removeEventListener("resize", this.props.setRate);
    this.state.isFull ? this.setState({ isFull: false }) : this.setState({ isFull: true });
  }

  hanldeClickImage = (evt, args) => {
    if (this.state.rightClick)
      this.panImage.current.getViewer().removeHotSpot('newHotSpot');
    this.setState({ rightClick: false, nextScene: '' })
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
    document.removeEventListener('contextmenu', e.preventDefault());
    let elements = document.getElementsByClassName('pnlm-about-msg');
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    if (e.button === 2 && this.state.editHotSpot) {
      if (this.state.rightClick)
        this.panImage.current.getViewer().removeHotSpot('newHotSpot');
      this.setState({ nextScene: '', newPitch: this.panImage.current.getViewer().mouseEventToCoords(e)[0], newYam: this.panImage.current.getViewer().mouseEventToCoords(e)[1] });
      this.panImage.current.getViewer().addHotSpot({
        id: 'newHotSpot',
        type: "custom",
        pitch: this.panImage.current.getViewer().mouseEventToCoords(e)[0],
        yaw: this.panImage.current.getViewer().mouseEventToCoords(e)[1],
        cssClass: "custom-hotspot"
      })
      this.setState({ rightClick: true })
    }
  }

  onLoadHandler = (e) => {
    let elements = document.getElementsByClassName('pnlm-about-msg');
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
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
  addScenToNewHotspot(id) {
    this.setState({ nextScene: id })
  }
  editHotSpots = () => {
    if (this.state.editHotSpot) {
      if (this.state.rightClick)
        this.panImage.current.getViewer().removeHotSpot('newHotSpot');
      this.setState({ rightClick: false, nextScene: '', newPitch: '', newYam: '' })
    }
    this.setState({ editHotSpot: !this.state.editHotSpot })
  }

  submitHandler = () => {
    let tooltipText = document.getElementById('next-scene-input').value;
    if (this.state.nextScene !== '' && tooltipText !== '') {
      let formData = new FormData();
      formData.append('imgid', this.state.taskId)
      formData.append('destid', this.state.nextScene)
      formData.append('pitch', this.state.newPitch)
      formData.append('yaw', this.state.newYam)
      formData.append('message', tooltipText)
      fetch(Url.addNewHotSpot,
        { method: 'POST', body: formData }
      )
        .then(res => res.json())
        .then(data => {
          this.setState({
            rightClick: false,
            nextScene: '',
            newPitch: '',
            newYam: '',
          });
          this.getData(this.state.taskId);
          alert(data.Message);
        })
        .catch(e => console.log('error:', e))
    } else
      alert('Please add the next scene and text.');
  }

  changePhotoInfo = () => {
    if (this.state.editPhoto) {
      console.log('Pitch: ' + this.panImage.current.getViewer().getPitch() + ' Yaw: ' + this.panImage.current.getViewer().getYaw() + ' Hfov: ' + this.panImage.current.getViewer().getHfov())
    } else {
      this.setState({ editPhoto: true })
    }
  }
  render() {
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
            pitch={this.state.imgPitch}
            yaw={this.state.imgYaw}
            hfov={this.state.imgHfov}
            autoLoad
            showControls={false}
            onLoad={e => this.onLoadHandler(e)}
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
          </div>
          <div className="thumbnail_div">
            <Thumbnail
              photoInfo={this.props.photoInfo}
              floorID={this.props.floorID}
              floorplan={this.props.floorplan}
              changeViewerImage={this.changeImage}
              currentImg={this.state.img}
              rightClick={this.state.rightClick}
              addScenToNewHotspot={this.addScenToNewHotspot} 
              cbmode={this.props.cbmode}
              />
          </div>
          <div className="photo-info">
            <div>
              <h2 id="simple-modal-title">Task Information: </h2>
              <p id="simple-modal-description">
                x: {this.state.x} y: {this.state.y}
              </p>
              <p> {this.state.info}</p>
              {/* delete false && */}
              {false && this.props.source !== "uploader" && (this.state.editPhoto ? <div><button onClick={this.changePhotoInfo}>sumbit</button><button onClick={cancel => { this.setState({ editPhoto: false }) }}>cancel</button></div> : <button onClick={this.changePhotoInfo}>change inital configuration</button>)}
            </div>
            {this.state.editHotSpot && this.state.rightClick && <div id='next-scene'>
              {this.state.nextScene === '' ? <span role="img" aria-label="pin">&#128306;</span> : <span role="img" aria-label="pin">&#128307;</span>}
              <input id='next-scene-input' />
              <button id='next-scene-submit' onClick={this.submitHandler}>submit</button>
              <button id='next-scene-cancel' onClick={cancel => {
                this.setState({ rightClick: false, nextScene: '', newPitch: '', newYam: '' }); if (this.state.rightClick)
                  this.panImage.current.getViewer().removeHotSpot('newHotSpot');
              }}>cancel</button>
            </div>}
          </div>
        </Fullscreen>
      </div>
    );
  }
}