import React from 'react';
import Point from './Point';
import Url from '../../../components/Url';
import Cookie from 'universal-cookie';

const cookie = new Cookie();
class AllPoints extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      points: [],
      rate: this.props.rate,
    };
    this.getData();
  }

  getData() {
    fetch(Url.getClientPoints + cookie.get('userID') + '/' + this.props.floorID)
      .then((r) => r.json()
        .then((data) => {
          if(data.Message === 'null')
            this.setState({ points: [] });
          else
            this.setState({ points: data });
        }));
  }

  displayPoints = () => {
    return this.state.points.map((point) => {
      if (point.Status === 'Closed')
        return this.showOnePoint(point.ID, point.Status, point.Lat, point.Lon, point.Img, point.Info);
      else
        return null;
    })
  }

  getPointColor(status) {
    return (
      status === 'New' ? 'yellow' :
        status === 'Assigned' ? 'pink' :
          status === 'Uploaded' ? 'blue' : 
            status === 'Done' ? 'green' :
              status === 'Denied' ? 'black' :
                status === 'Requested' ? 'orange' :
                  status === 'Reject' ? 'brown' : 'grey'
    )
  }

  changeImage(id) {
    //pass image id to Thumbnail
    this.props.rightClick ? this.props.addScenToNewHotspot(id) : this.props.changeThumbnailImage(id);
  }

  showOnePoint(key, status, x, y, img) {
    const color = this.getPointColor(status);
    let pointStyle = {};
    if (this.props.currentImg === img) {
      pointStyle = {
        color: 'pink',
        // set center of the point to the coordinates
        left: (x - 12) * this.props.rate + 'px',
        top: (y - 12) * this.props.rate + 'px',
      }
    } else {
      pointStyle = {
        color: color,
        // set center of the point to the coordinates
        left: (x - 12) * this.props.rate + 'px',
        top: (y - 12) * this.props.rate + 'px',
      }
    }

    return (
      <div className='currentPoints' style={pointStyle} key={key} onClick={() => this.changeImage(key)}>
        <Point rate={this.props.rate} />
      </div>
    )
  }

  render() {
    return this.displayPoints();
  }

}
export default AllPoints;
