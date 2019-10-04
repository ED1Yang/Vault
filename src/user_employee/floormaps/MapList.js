import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
// import { IconButton, Typography } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Cookie from 'universal-cookie'
//components
import TopToolbar from '../../components/TopToolbar'
import ProjectCard from './components/MapCard';
import Main from '../main/Main'
import Url from '../../components/Url';

const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});
const cookie=new Cookie();
class MapList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      maps: [],
      loading: true,
      redirect: typeof this.props.location.state === 'undefined' ? true : false,
      search:"",
      searching:false,
      searchedMaps:[],
    }
    this.getsearch=this.getsearch.bind(this);
    if(!this.state.redirect)
      this.getData();
  }

  getData = () =>{
  fetch(Url.getEmpMaps+cookie.get('userID') +'/'+this.props.location.state.id,{method:'GET'})
		  .then(res => res.json())
      .then(data => {
        data.Message !== 'null' ? this.setState({maps: data, loading: false,searchedMaps:data}) : this.setState({maps: [], loading: false});
      })
      .catch(e => console.log('error:', e)) 
  }

  searchData(){
    let data = this.state.maps;
    let search =this.state.search;
    let newList = [];
    if (search !== "") {
      newList = data.filter(item => {
        const lc = item.Floornumber.toString();
        const filter = search.toString();
        return lc.includes(filter);
      });
    } else {
      newList = data;
    }
    this.setState({
      searchedMaps: newList,
      searching:false,
    });
}

getsearch(search){
  this.setState({search:search,searching:true,});

}

componentDidUpdate() {
  if(this.state.searching){
    this.searchData();
  }
}

  
  render(){
    const { classes } = this.props;
    if(this.state.redirect){
      return <Redirect exact from="/" to="/employee/dashboard"/>
    }else{
      if(this.state.loading || this.state.projects === [])
        return null;
      else{
        let contents =
            <div className={classes.root}>
              <TopToolbar title='floor plan' getsearch={this.getsearch}/>
              <div className={classes.content}>
                <Grid
                  container
                  spacing={3}
                >
                  {this.state.searchedMaps.map(map => (
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
              {/* <div>
                <Typography variant="caption">1-6 of 20</Typography>
                <IconButton>
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton>
                  <ChevronRightIcon />
                </IconButton>
              </div> */}
            </div>
          return <Main value={contents} />
      }
    }
  }
}
MapList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MapList);