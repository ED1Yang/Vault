import React from 'react';
import Icons from './Icons';
import Url from '../../../components/Url';
import Cookie from 'universal-cookie';

const cookie = new Cookie();
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
    fetch(Url.getEmpPoints + cookie.get('userID') + '/' + this.props.floorID)
      .then((r) => r.json()
        .then((data) => {
          if(data.Message === 'null')
            this.setState({ points: [] });
          else
            this.setState({ points: data });
        }));
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
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
      status === 'New' ? 'yellow' :
        status === 'Assigned' ? 'pink' :
          status === 'Uploaded' ? 'blue' : 
            status === 'Done' ? 'green' :
              status === 'Denied' ? 'black' :
                status === 'Requested' ? 'orange' :
                  status === 'Reject' ? 'brown' : 'grey'
    )
  }

  showOnePoint(key, status, x, y, img, info) {
    const color = this.getPointColor(status);
    let pointStyle = {
      color: color,
      // set center of the point to the coordinates
      left: (x - 12) * this.props.rate + 'px',
      top: (y - 12) * this.props.rate + 'px',
    }
    return (
      <div className='currentPoints' style={pointStyle} key={key}>
        <Icons
          value={{
            taskId: key,
            status: status,
            x: x,
            y: y,
            img: img,
            info: info,
          }}
          parent={this}
          floorID={this.props.floorID}
          floorplan={this.props.floorplan}
          rate={this.props.rate}
        />
      </div>
    )
  }

  render() {
    return this.displayPoints();
  }


}
export default ShowPoints;