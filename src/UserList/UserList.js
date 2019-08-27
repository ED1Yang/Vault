import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//components
import UsersTable from './components/UsersTable'
import UsersToolbar from './components/UsersToolbar'
import mockData from './data';
import Dashboard from '../dashboard/Dashboard'

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
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>

  return <Dashboard value={contents} />
};

export default UserList;
