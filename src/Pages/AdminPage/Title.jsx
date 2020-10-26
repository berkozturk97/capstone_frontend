import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Global } from '../../Global';

export default function Title(props) {
  return (
    <Typography component="h2" variant="h6" color={Global.color.backgrond} gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};