import React from 'react';
import {  Grid } from '@material-ui/core';
// import { IconButton, Typography } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//components
import TopToolbar from '../../components/TopToolbar'
import ProjectCard from './components/ProjectCard';
import Main from '../main/Main'
import Url from '../../components/Url';
import Cookies from 'universal-cookie';

const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

const cookies = new Cookies();


class ProjectList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      projects: [],
      loading: true,
      search:"",
      searching:false,
      searchedProjects:[],
    }
    this.getsearch=this.getsearch.bind(this);
    this.getData = this.getData.bind(this)
    this.getData();
  }

  getData = () =>{
    fetch(Url.getEmpProjects + cookies.get('userID'),{method: 'GET'})
		  .then(res => res.json())
      .then(data => {
        data.Message !== 'null' ? this.setState({projects: data, loading: false,searchedProjects:data}) : this.setState({projects: [], loading: false});

		  })
      .catch(e => console.log('error:', e))
  }

  searchData(){
          let data = this.state.projects;
          let search =this.state.search;
          let newList = [];
          if (search !== "") {
            newList = data.filter(item => {
              const lc = item.Projname.toLowerCase();
              const filter = search.toLowerCase();
              return lc.includes(filter);
            });
          } else {
            newList = data;
          }
          this.setState({
            searchedProjects: newList,
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
    if(this.state.loading || this.state.projects === [])
      return null;
    else{
      let contents =
          <div className={classes.root}>
            <TopToolbar title='project' getsearch={this.getsearch}/>
            <div className={classes.content}>
              <Grid
                container
                spacing={3}
              >
                {this.state.searchedProjects.map(project => (
                  <Grid
                    item
                    key={project.Projid}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                      <ProjectCard project={project} />
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

ProjectList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProjectList);