import React from 'react'

import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: '#fff',
    },
  }));

export const LoadingProgress = () => {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
