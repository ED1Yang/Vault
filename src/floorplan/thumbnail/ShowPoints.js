import React from 'react';
import Icons from './Icons';
import Url from '../util/Url';

class ShowPoints extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      points: [],
      rate: this.props.rate,
    };
    this.getData();
  }
  
  getData() {
    fetch(Url.getClientPoints)
      .then((r) => r.json()
        .then((data) => {
          this.setState({ points: data });
        }));
  }

  displayPoints = () => {
      return this.state.points.map((point) => {
        return this.showOnePoint(point.ID, point.Status, point.Lat, point.Lon, point.Img, point.Info);
      })
  }

  getPointColor(status) {
    return (
      status === 'New' ? 'green' : 
        status === 'Closed' ? 'grey' : 
          status==='Working'? 'blue' : 'pink'
    )
  }

  showOnePoint(key, status, x, y, img, info) {
    const color = this.getPointColor(status);
    let pointStyle = {
      color: color,
      // set center of the point to the coordinates
      left: (x-12)*this.props.rate + 'px',
      top: (y-12)*this.props.rate + 'px',
    }
    return (
      <div className='currentPoints' style={pointStyle} key={key}>
        <Icons rate={this.props.rate}/>
      </div>
    )
  }

  render() {
    return this.displayPoints();
  }


}
export default ShowPoints;