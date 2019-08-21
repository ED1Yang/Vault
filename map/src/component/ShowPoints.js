import React from 'react';
import Icons from './Icons';

class ShowPoints extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      points: [],
    };
  }

  testfunction(){
    console.log('test is successful')
  }
  
  getData() {
    fetch('http://localhost/api/client/2')
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
    this.getData()
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
        status === 'Closed' ? 'grey' : 'blue'
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
