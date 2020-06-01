import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';


import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    circuleProgress: {
   
      
      
    },
    progressBox: {
      zIndex: theme.zIndex.modal+10,
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        top: 0,
        
    }
  }));
  

const Loading = () => {
  const classes = useStyles();

  
    return (
    <Box className={classes.progressBox}  >
        <CircularProgress color="primary" />        
       </Box>
    )
}
  
export default Loading;

