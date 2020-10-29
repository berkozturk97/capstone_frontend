import React from "react";
import Particles from "../video/videoplayback.mp4";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./HomePage.css";

function Copyright() {
  return (
    <Typography variant="body2" style={{color: "#1db954"}}  align="center">
      {"Copyright © "}
      <Link style={{color: "#1db954"}}>Smart Lock</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      }
    }
  },
})(TextField);

const HomePage = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    email: "",
    showAlert: false,
    alertInfo: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleClose = () => {
    setValues({
      ...values,
      showAlert: false,
    });
  };
  return (
    <div className="Container">
      <video autoPlay="autoplay" loop="loop" muted className="Video">
        <source src={Particles} type="video/mp4"  />
        Your browser does not support the video tag.
      </video>

      <div className="Content">
        <div className="SubContent">
          <Grid container component="main">
            {/* <AlertModal openAlert={values.showAlert} closePopUp={handleClose} alertInfo={values.alertInfo} /> */}
            <CssBaseline />

            <div className={classes.paper}>
              {/*<Avatar className={classes.avatar}>
    </Avatar> */}
              <Typography
                component="h1"
                variant="h5"
                style={{ color: "#1db954" }}
              >
                Smart Lock Admin Panel
              </Typography>
              <form className={classes.form} noValidate>
                <CssTextField
                  InputLabelProps={{
                    style: { color: '#fff',}, 
                 }}
                 InputProps={{
                   style: {color: '#fff'}
                 }}
                  className={classes.margin}
                  value={values.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <CssTextField
                  InputLabelProps={{
                    style: { color: '#fff',}, 
                 }}
                 InputProps={{
                   style: {color: '#fff'}
                 }}
                  className={classes.margin}
                  value={values.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  onClick
                  //type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  LOGIN
                </Button>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  // image: {
  //   backgroundImage: 'url(https://cora-images.s3.eu-central-1.amazonaws.com/1582201606802)',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundColor:
  //     theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  // },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#4F34A3",
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    width: 400,
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    border: "2px 1db954",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  alertButton: {
    backgroundColor: "#5D3DBD",
    color: "#FFD10D",
  },
  TextField: {
    borderColor: "white",
    color: "white",
    backgroundColor: "white",
  },
  input: {
    '&::placeholder': {
      color: 'white',
    },
  },
}));

