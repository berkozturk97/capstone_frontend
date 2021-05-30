import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getAllDoor } from '../../API/api';
import { Global } from '../../Global';
import LogDetailModal from '../../components/logdetailmodal/LogDetailModal';
import { Search } from '../../components/searchbar/Searchbar';

// Generate Order Data
function createData(index, name, paymentMethod, seeMore) {
  return { index, name, paymentMethod, seeMore };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  search: {
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '20%',
  },
}));



export default function Orders() {
  const [rows, setRows] = useState([]);
  const [unFilteredRows, setUnFilteredRows] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [doorName, setDoorName] = React.useState('');
  const [doors, setDoors] = useState([])

  useEffect(() => {
    getLogsToPanel();
  }, [])


  const getLogsToPanel = async () => {
    let deneme = [];
    let responseData = await getAllDoor();
    setDoors(responseData);
    if (responseData !== null) {
      console.log(responseData)
      responseData.map((item, index) => {
        let date = new Date(item.createdAt)
        deneme.push(createData(index, item.doorName,
          item._id, seeMore(item._id)));
      });
    }
    setRows(deneme);
    setUnFilteredRows(deneme)
  }

  function preventDefault(event) {
    event.preventDefault();
  }
  const handleInputChange = (e) => {
    console.log(rows)
    const filtered = unFilteredRows.filter(element => {
      return element.name.toLowerCase().includes(e.toLowerCase())
    })
    setDoorName(e);
    setRows(filtered)
  };

  const seeMore = (doorId) => {
    return (
      <div onClick={() => {
        setSelectedItem(doorId)
        setPopUp(true)
        console.log("selectedItem" + doorId)
      }}>
        <a style={{ color: '#208AAE', cursor: 'pointer' }}>See Detail</a>
      </div>
    )
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <LogDetailModal
        openAlert={popUp}
        closePopUp={() => setPopUp(false)}
        doors={doors}
        selectedItem={selectedItem} />

      <Search
        value={doorName}
        onChange={handleInputChange} />

      <Title style={{ color: Global.color.backgrond }}>Doors</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: Global.color.grey }}>Number</TableCell>
            <TableCell style={{ color: Global.color.grey }}>Name</TableCell>
            <TableCell style={{ color: Global.color.grey }}>Door Id</TableCell>
            <TableCell style={{ color: Global.color.grey }} align="right">Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            console.log(row.amount)
            return (
              <TableRow key={row.date}>
                <TableCell style={{ color: Global.color.blue }}>{row.index + 1}</TableCell>
                <TableCell style={{ color: Global.color.white }}>{row.name}</TableCell>
                <TableCell style={{ color: Global.color.white }}>{row.paymentMethod}</TableCell>
                <TableCell align="right">{row.seeMore}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className={classes.seeMore} />
    </React.Fragment>
  );
}