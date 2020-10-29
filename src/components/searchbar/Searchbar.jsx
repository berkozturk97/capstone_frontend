import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
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

export const Search = ({value,onChange}) => {
  console.log(value)
  const classes = useStyles();

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
          borderColor: 'green',
        },
        '&:hover fieldset': {
          borderColor: 'green',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        }
      }
    },
  })(TextField);
  
  return(
  <div className={classes.search}>
      <CssTextField
        InputLabelProps={{
          style: { color: '#fff',}, 
       }}
       InputProps={{
         style: {color: '#fff'}
       }}
        //className={classes.margin}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        variant="outlined"
        margin="normal"
        label="Search Door..."
        name="Search"
        autoFocus
      />
  </div>
  )
}
  
