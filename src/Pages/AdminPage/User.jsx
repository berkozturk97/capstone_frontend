import React, { useEffect } from "react";

import clsx from "clsx";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Orders from "./Orders";
import { Global } from "../../Global";
import { getAllDoor, getAllUsers } from "../../API/api";
import UserAccessModal from "../../components/UserAccessModal/UserAccessModal";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: Global.color.backgrond,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Global.color.backgrond,
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: Global.color.backgrond,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    backgroundColor: Global.color.backgrond,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundColor: Global.color.background_secondary,
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    color: Global.color.backgrond,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: Global.color.background_secondary,
    color: Global.color.grey,
  },
  fixedHeight: {
    height: 150,
  },
  search: {
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "20%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    alignSelf: "center",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  usersContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  aviableDoors: {
    width: "25%",
    marginLeft: 10,
  },
  doorName: {
    width: "40%",
  },
  seeDetail: {
    width: 100,
  },
}));

function Users() {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [doors, setDoors] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [values, setValues] = React.useState({
    doorName: "",
  });

  useEffect(() => {
    getUsersAndDoors();
  }, []);
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderDoors = (user) => {
    const doorGroups = groupByDoorId();
    return (user.permissions || []).map((door) => {
      return doorGroups[door] && (doorGroups[door].doorName + ", " || "");
    });
  };

  const groupByDoorId = () => {
    const lookup = {};

    (doors || []).forEach((door) => {
      lookup[door._id] = door;
    });

    return lookup;
  };
  
  const modalHandler = (user) => {
    setSelectedItem(user);
    setShowModal(true);
  };

  const getUsersAndDoors = async () => {
    const fetchedUsers = await getAllUsers();
    setUsers(fetchedUsers);
    const fetchedDoors = await getAllDoor();
    setDoors(fetchedDoors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
            color={Global.color.white}
          >
            <MenuIcon style={{ color: Global.color.white }} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            style={{ color: Global.color.green }}
            className={classes.title}
          >
            User's Door Authorization
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton
            onClick={
              open ? () => handleDrawerClose() : () => handleDrawerOpen()
            }
          >
            {open ? (
              <ChevronLeftIcon style={{ color: Global.color.white }} />
            ) : (
              <ChevronRightIcon style={{ color: Global.color.white }} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {users.map((user) => {
                  return (
                    <div className={classes.usersContainer}>
                      <Typography className={classes.aviableDoors}>
                        {user.fullName}
                      </Typography>
                      <Typography className={classes.aviableDoors}>
                        Aviable doors:{" "}
                      </Typography>
                      <Typography className={classes.doorName}>
                        {renderDoors(user)}
                      </Typography>
                      <span
                        style={{ color: "#208AAE", cursor: "pointer" }}
                        className={classes.seeDetail}
                        onClick={() => modalHandler(user)}
                      >
                        Manage
                      </span>
                    </div>
                  );
                })}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <UserAccessModal
              openAlert={showModal}
              closePopUp={() => setShowModal(false)}
              selectedItem={selectedItem}
              doors={doors}
            />
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Users;
