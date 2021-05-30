import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React, { useEffect, useState } from "react";
import { Global } from "../../Global";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { updateUserPermissions } from "../../API/api";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paperModal: {
    width: 500,
    height: 400,
    borderRadius: 10,
    backgroundColor: Global.color.background_secondary,
    border: "2px solid 4F34A3",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "scroll",
    scrollbarColor: "green",
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white",
    },
    "&:hover .MuiInputLabel-root": {
      color: "white",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
  alertButton: {
    backgroundColor: "#5D3DBD",
    color: "#FFD10D",
  },
  mainTitle: {
    color: "white",
  },
  helperText: {
    color: "red",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  doorsContainer: {
    display: "flex",
    padding: 10,
    justifyContent: "flexStart",
    alignItems: "center",
    flexWrap: "wrap",
    width: 400,
  },
}));

function UserAccessModal({ openAlert, closePopUp, selectedItem, doors }) {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDoors, setSelectedDoors] = useState([]);
  const [currentDoor, setCurrentDoor] = useState();
  const rootRef = React.useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (selectedItem !== undefined) {
      const a = renderDoors(selectedItem);
      setSelectedDoors(a);
      console.log(a);
    }
  }, [selectedItem]);

  const renderDoors = (user) => {
    const doorGroups = groupByDoorId();
    let arr = [];
    return (user.permissions || []).map((door) => {
      if (doorGroups[door] && (doorGroups[door].doorName + ", " || "")) {
        return {
          doorName: doorGroups[door].doorName || "",
          id: doorGroups[door]._id || "",
        };
      }
    });
  };

  const groupByDoorId = () => {
    const lookup = {};

    (doors || []).forEach((door) => {
      lookup[door._id] = door;
    });

    return lookup;
  };

  const handleDoor = () => {
    setSelectedDoors([
      ...selectedDoors,
      { doorName: currentDoor.doorName, id: currentDoor._id },
    ]);
    console.log(selectedDoors);
  };
  const handleDelete = (item, index) => {
    const updatedArray = selectedDoors.filter((item, i) => i !== index);
    setSelectedDoors(updatedArray);
  };
  const sendDoorToDB = () => {
    let newDoors = selectedDoors;
    let updatedId = [];
    for (let index = 0; index < selectedDoors.length; index++) {
      delete newDoors[index].doorName;
    }
    for (let index = 0; index < newDoors.length; index++) {
      updatedId.push(newDoors[index].id);
    }
    let body = {
      permissions: updatedId,
    };
    const a = updateUserPermissions({ body: body, _id: selectedItem._id });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={openAlert}
      onClose={closePopUp}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      className={classes.modal}
      container={() => rootRef.current}
    >
      <div className={classes.paperModal}>
        <h3 className={classes.mainTitle}>Authorize user's door access</h3>
        <div className={classes.inputContainer}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              style={{ color: "white" }}
              htmlFor="outlined-age-native-simple"
            >
              Doors
            </InputLabel>
            <Select
              className={classes.select}
              native
              onChange={(e) => {
                setCurrentDoor(JSON.parse(e.target.value));
              }}
              label="Doors"
              inputProps={{
                name: "Doors",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              {doors.map((item, index) => {
                return (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.doorName}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <Button
            onClick={handleDoor}
            variant="contained"
            style={{
              backgroundColor: "green",
              color: "white",
              marginLeft: 10,
              textTransform: "none",
            }}
          >
            Create
          </Button>
        </div>
        <div className={classes.doorsContainer}>
          {selectedDoors.map((item, index) => {
            return (
              <Chip
                label={item.doorName}
                style={{ backgroundColor: "green", color: "white", margin: 7 }}
                onDelete={() => handleDelete(item, index)}
              />
            );
          })}
        </div>
        <Button
          onClick={sendDoorToDB}
          variant="contained"
          style={{
            display: "flex",
            backgroundColor: "green",
            color: "white",
            marginLeft: 10,
            textTransform: "none",
          }}
        >
          Send
        </Button>
      </div>
    </Modal>
  );
}

export default UserAccessModal;
