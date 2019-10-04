/* eslint-disable no-script-url */

import React from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'universal-cookie';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Title from './Title';
import Url from '../../../components/Url';



const cookie = new Cookie();
export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      loading: true,
    }
    this.getData = this.getData.bind(this)
    this.getData();
  }

  getData = () => {
    fetch(Url.getAdminProjects + cookie.get('userID'), { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        data.Message !== 'null' ? this.setState({ projects: data, loading: false }) : this.setState({ projects: [], loading: false });

      })
      .catch(e => console.log('error:', e))
  }

  render() {
    const linkStyle = {
      marginTop: "10px",
    }

    const avatarStyle={
      margin: 10,
    }

    if (this.state.loading || this.state.projects === [])
      return null;
    else {
      return (
        <React.Fragment>
          <Title>Current Projects</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell align="right">Client Name</TableCell>
                {/* <TableCell align="right">Task Accomplished %</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.projects.map(project => (
                
                <TableRow key={project.Projid}>
                  
                  <TableCell>
                  <Grid container alignItems="center">
                  <Avatar alt="project_avatar" src={project.Projlogo} style={avatarStyle} />
                  <Link to={{ pathname:'/admin/floorplans/' , state:{ id: project.Projid }}}>
                  {project.Projname}
                  </Link>
                  </Grid>
                  </TableCell>
                  <TableCell align="right">{project.Projdesc}</TableCell>
                  {/* <TableCell align="right">{project.task}</TableCell> */}
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link to={{ pathname:'/admin/projects/'}} style={linkStyle}>
            See more projects
        </Link>
        </React.Fragment>
      );
    }
  }
}