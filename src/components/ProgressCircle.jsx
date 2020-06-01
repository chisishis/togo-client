import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.modal+10,
      backgroundColor: 'rgba(255,255,255,0.5)',
      color: '#222'
    },
  }));
  

const ProgressCircle = () => {
  const classes = useStyles();

  
    return (
        <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
        {/* <Typography variant='h4' component='div'>{loadingMessage}</Typography> */}
      </Backdrop>
    )
}
  
export default ProgressCircle;

