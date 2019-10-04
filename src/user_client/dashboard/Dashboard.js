import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//components
import Main from '../main/Main'
import Chart from './components/Chart';
import Tasks from './components/Tasks';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 500,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const defaultDashboard =
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      {/* project list */}
      <Grid item xs={12} md={8} lg={8}>
        <Paper className={fixedHeightPaper}>
          <Tasks className={fixedHeightPaper}/>
        </Paper>
      </Grid>
    </Grid>

  return <Main value={defaultDashboard}/>;
}