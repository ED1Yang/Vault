import React from 'react';
//components
import AllPoints from './AllPoints';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate_small: 0.15,
      rate_big: 0.5,
      isLoaded: false,
      rate: '',
      width: this.props.photoInfo.naturalWidth,
      height: this.props.photoInfo.naturalHeight,
    };
    this.changeImage = this.changeImage.bind(this);
    this.addScenToNewHotspot = this.addScenToNewHotspot.bind(this);
  }


  changeImage(id) {
    //pass image id to Viewer
    this.props.changeViewerImage(id);
  }

  hoverHandler(e) {
    const hoverNum = this.state.rate_big / this.state.rate_small;
    this.setState({ rate: this.state.rate_big, width: this.state.width * hoverNum, height: this.state.height * hoverNum, });
  }

  hoverOutHandler() {
    const hoverOutNum = this.state.rate_small / this.state.rate_big;
    this.setState({ rate: this.state.rate_small, width: this.state.width * hoverOutNum, height: this.state.height * hoverOutNum, });
  }

  getPhotoInfo() {
    let photo = document.getElementById('thumbnail_map');
    this.setState({ rate: this.state.rate_small, width: photo.width * this.state.rate_small, height: photo.height * this.state.rate_small });
  }

  addScenToNewHotspot(id) {
    this.props.addScenToNewHotspot(id);
  }

  render() {
    const photoStyle = {
      width: this.state.width + 'px',
      height: this.state.height + 'px',
    }
    
    return (
      <div
        className="container_map"
        onMouseOver={() => this.hoverHandler()}
        onMouseOut={() => this.hoverOutHandler()}>
        <img
          id='thumbnail_map'
          alt='map'
          src={this.props.floorplan}
          onLoad={() => this.getPhotoInfo()}
          style={photoStyle}
        />
        <div className="map_points">
          <AllPoints floorID={this.props.floorID} changeThumbnailImage={this.changeImage} rate={this.state.rate} currentImg={this.props.currentImg} addScenToNewHotspot={this.addScenToNewHotspot} rightClick={this.props.rightClick}/>
        </div>

      </div>
    )
  }
}
export default Thumbnail;
