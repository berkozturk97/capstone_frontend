import React, { useEffect, useState } from 'react';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import './LogDetailModal.css'
import { Global } from '../../Global';
import { getLogByDoorId } from '../../API/api';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Title from '../../Pages/AdminPage/Title';
import Spinner from '../Spinner/Spinner';
const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		padding: theme.spacing(1),
		justifyContent: 'center',
	},
	paperModal: {
		width: 1100,
		borderRadius: 10,
		backgroundColor: Global.color.background_secondary,
		border: '2px solid 4F34A3',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		overflowY:'scroll',
		scrollbarColor: 'green',
	},
	alertButton: {
		backgroundColor: '#5D3DBD',
		color: '#FFD10D'
	},
	helperText: {
		color: 'red'
	}
}));

function createData(id, fullName, rfid, doorName, isOpen) {
	return { id, fullName, rfid, doorName, isOpen };
}

export default function LogDetailModal(props) {
	const classes = useStyles();
	const [rows, setRows] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const rootRef = React.useRef(null);

	useEffect(() => {
		setIsVisible(false)
		getDoorEnterenceById();
	}, [props.selectedItem])

	const getDoorEnterenceById = async () => {
		let deneme = [];
		let body = {
			doorId: props.selectedItem
		}
		let responseData = await getLogByDoorId({ body: body });
		if (responseData !== null) {
			responseData.map((item) => {
				let date = new Date(item.createdAt)
				deneme.push(createData(date.toLocaleString(), item.user.fullName,
					item.rfid, item.doorId.doorName, item.isOpen.toString()));
			});
		}
		console.log(responseData)
		setRows(deneme);
		setIsVisible(true)
	}


	const renderTable = () => {
		if (isVisible === true) {
			return (
				<div className={classes.paperModal}>
					<div className={classes.paper} style={{ marginTop: 0 }}>
						<ErrorIcon style={{ alignSelf: 'center', marginTop: 0, fontSize: 60, marginBottom: 20, color: '#1db954' }} />
						<h2 id="server-modal-title" className={classes.paper} style={{ marginTop: 0 }}>List of Enterence</h2>
						<React.Fragment>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell style={{ color: Global.color.grey }}>Date</TableCell>
										<TableCell style={{ color: Global.color.grey }}>Name</TableCell>
										<TableCell style={{ color: Global.color.grey }}>RFID</TableCell>
										<TableCell style={{ color: Global.color.grey }}>Door Name</TableCell>
										<TableCell style={{ color: Global.color.grey }} align="right">Enterence</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => {
										return (
											<TableRow key={row.date}>
												<TableCell style={{ color: Global.color.white }}>{row.id}</TableCell>
												<TableCell style={{ color: Global.color.white }}>{row.fullName}</TableCell>
												<TableCell style={{ color: Global.color.white }}>{row.rfid}</TableCell>
												<TableCell style={{ color: Global.color.white }}>{row.doorName}</TableCell>
												<TableCell style={{ color: row.isOpen === "true" ? Global.color.green : Global.color.red }} align="right">{row.isOpen}</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</React.Fragment>
					</div>
				</div>
			)
		} else {
			return (<div>
				<Spinner />
			</div>)
		}

	}

	return (
		<Modal
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			open={props.openAlert}
			onClose={props.closePopUp}
			aria-labelledby="server-modal-title"
			aria-describedby="server-modal-description"
			className={classes.modal}
			container={() => rootRef.current}
		>
			{renderTable()}
		</Modal>
	)

}
