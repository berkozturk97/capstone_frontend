import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getAllDoor, getLog } from '../../API/api';
import { Global } from '../../Global';
import LogDetailModal from '../../components/logdetailmodal/LogDetailModal';

// Generate Order Data
function createData(index, name, shipTo, paymentMethod, seeMore) {
  return { index, name, shipTo, paymentMethod, seeMore };
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
  const [popUp, setPopUp] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  useEffect(() => {
    getLogsToPanel();
  }, [])


  const getLogsToPanel = async () => {
    let deneme = [];
    let responseData = await getAllDoor();
    if (responseData !== null) {
      console.log(responseData)
      responseData.map((item, index) => {
        let date = new Date(item.createdAt)
        deneme.push(createData(index, item.doorName,
          item.doorId, item._id, seeMore(item._id)));
      });
    }
    setRows(deneme);
  }
  const seeMore = (doorId) => {
    return (
      <div onClick={() => {
        setSelectedItem(doorId)
        setPopUp(true)
        console.log("selectedItem" + doorId)
      }}>
        <a style={{ color: '#3949AB', textDecoration: "underline", cursor: 'pointer' }}>See Detail</a>
      </div>
    )
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <LogDetailModal
        openAlert={popUp}
        closePopUp={() => setPopUp(false)}
        selectedItem={selectedItem} />
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: Global.color.grey }}>Number</TableCell>
            <TableCell style={{ color: Global.color.grey }}>Name</TableCell>
            <TableCell style={{ color: Global.color.grey }}>Door Code</TableCell>
            <TableCell style={{ color: Global.color.grey }}>Door Id</TableCell>
            <TableCell style={{ color: Global.color.grey }} align="right">Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            console.log(row.amount)
            return (
              <TableRow key={row.date}>
                <TableCell style={{ color: Global.color.white }}>{row.index + 1}</TableCell>
                <TableCell style={{ color: Global.color.white }}>{row.name}</TableCell>
                <TableCell style={{ color: Global.color.white }}>{row.shipTo}</TableCell>
                <TableCell style={{ color: Global.color.white }}>{row.paymentMethod}</TableCell>
                <TableCell align="right">{row.seeMore}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className={classes.seeMore}/>
    </React.Fragment>
  );
}