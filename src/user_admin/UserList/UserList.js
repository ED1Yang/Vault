import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//components
import UsersTable from './components/UsersTable'
import TopToolbar from '../../components/TopToolbar'
import mockData from './data';
import Main from '../main/Main'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const [users] = useState(mockData);
  const contents = 
     <div className={classes.root}>
      <TopToolbar title='user'/>
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>

  return <Main value={contents} />
};

export default UserList;
