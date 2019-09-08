/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Aug, 2019', 'Elvis Presley', 'Fletcher', 'Office Building', 'New'),
  createData(1, '16 Aug, 2019', 'Paul McCartney', 'ADHB', 'Central Hospital', 'Closed'),
  createData(2, '16 Aug, 2019', 'Tom Scholz', 'Metlifecare', 'Clinic #5919', 'Backlog'),
  createData(3, '16 Aug, 2019', 'Michael Jackson', 'Auckland Airport', 'Auckland Airport Terminal 99', 'Approval'),
  createData(4, '15 Aug, 2019', 'Bruce Springsteen', 'NZSTRONG', 'Biology research center', 'Denied'),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Tasks</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Uploader</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell align="right">Task Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more tasks
        </Link>
      </div>
    </React.Fragment>
  );
}