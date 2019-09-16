import React from 'react';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
//components
import TopToolbar from '../../components/TopToolbar'
import ProjectCard from './components/MapCard';
import Main from '../main/Main'
import Url from '../../components/Url';

class MapList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      maps: [],
      loading: true,
    }
    this.getData();
  }

  getData = () =>{
    fetch(Url.getAdminMaps + this.props.location.state.id,{method: 'GET'})
		  .then(res => res.json())
      .then(data => {
        data.Message !== 'null' ? this.setState({maps: data, loading: false}) : this.setState({maps: [], loading: false});
      })
      .catch(e => console.log('error:', e))
  }
  render(){
    if(this.state.loading || this.state.projects === [])
      return null;
    else{
      let contents =
          <div >
            <TopToolbar title='project' />
            <div>
              <Grid
                container
                spacing={3}
              >
                {this.state.maps.map(map => (
                  <Grid
                    item
                    key={map.FloorID}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                      <ProjectCard map={map} />
                  </Grid>
                ))}
              </Grid>
            </div>
            <div>
              <Typography variant="caption">1-6 of 20</Typography>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        return <Main value={contents} />
    }
  }
}

export default MapList;