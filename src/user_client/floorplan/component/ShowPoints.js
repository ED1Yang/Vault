import React from 'react';
import Icons from './Icons';
import Url from '../../../components/Url';

class ShowPoints extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      points: [],
      show: true,
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

  componentDidMount() {
    this.props.onRef&&this.props.onRef(this);
    this.displayPoints();
  }

  displayPoints = () => {
    if (this.state.points === null) {
      return;
    }
    else {
      return this.state.points.map((point) => {
        return this.showOnePoint(point.ID, point.Status, point.Lat, point.Lon, point.Img, point.Info);
      })
    }
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
      left: x - 12 + 'px',
      top: y - 12 + 'px',
    }
    return (
      <div className='currentPoints' style={pointStyle} key={key}>
        <Icons
          value={{
            taskId: key,
            x: x,
            y: y,
            img: img,
            info: info,
          }}
          parent={this}
        />
      </div>
    )
  }

  render() {
    return this.displayPoints();
  }


}
export default ShowPoints;