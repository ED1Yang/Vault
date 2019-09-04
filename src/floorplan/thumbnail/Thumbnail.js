import React from 'react';
//components
import ShowPoints from './ShowPoints';
//images
import floorPlan from '../../assets/images/Ground_floor.png';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate_small: 0.15,
      rate_big:0.5,
      isLoaded: false,
      rate:'',
      width: '',
      height: '',
    };
  }

  hoverHandler(e) {
    const hoverNum=this.state.rate_big/this.state.rate_small;
    this.setState({ rate: 0.50, width:this.state.width*hoverNum,height:this.state.height*hoverNum, });
  }

  hoverOutHandler() {
    const hoverOutNum=this.state.rate_small/this.state.rate_big;
    this.setState({ rate: 0.15, width:this.state.width*hoverOutNum,height:this.state.height*hoverOutNum, });
  }

  getPhotoInfo() {
    let photo = document.getElementById('thumbnail_map');
    this.setState({ width: photo.width*this.state.rate_small, height: photo.height*this.state.rate_small});

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
          src={floorPlan}
          onLoad={() => this.getPhotoInfo()}
          style={photoStyle}
        />
        <div className="map_points">
          <ShowPoints rate={this.state.rate} />
        </div>

      </div>
    )
  }
}
export default Thumbnail;
