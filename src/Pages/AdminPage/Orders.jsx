import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getLog } from '../../API/api';
import { Global } from '../../Global';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function Orders() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getLogsToPanel();
  }, [])
  const getLogsToPanel = async () => {
    let deneme = [];
    let responseData = await getLog();
    if (responseData !== null) {
      console.log(responseData)
      responseData.map((item, index) => {
        let date = new Date(item.createdAt)
        deneme.push(createData(index, date.toLocaleString(), item.user.fullName,
          item.rfid, item.doorid, item.isOpen.toString()));
      });
    }
    setRows(deneme);
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: Global.color.grey }}>Date</TableCell>
            <TableCell style={{ color: Global.color.grey }}>Name</TableCell>
            <TableCell style={{ color: Global.color.grey }}>RFID</TableCell>
            <TableCell style={{ color: Global.color.grey }}>DoorId</TableCell>
            <TableCell style={{ color: Global.color.grey }} align="right">isOpen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) =>{
            console.log(row.amount)
            return (
            <TableRow key={row.date}>
              <TableCell style={{ color: Global.color.white }}>{row.date}</TableCell>
              <TableCell style={{ color: Global.color.white }}>{row.name}</TableCell>
              <TableCell style={{ color: Global.color.white }}>{row.shipTo}</TableCell>
              <TableCell style={{ color: Global.color.white }}>{row.paymentMethod}</TableCell>
              <TableCell style={{ color: row.amount === "true" ?  Global.color.green : Global.color.red }} align="right">{row.amount}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}