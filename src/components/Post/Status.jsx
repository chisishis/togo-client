import React from "react";
import { makeStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";

import {statusColors} from '../../assets/statusColors'


const useStyles = makeStyles((theme) => ({
  button: (props) => ({
    marginTop: 10,
    color: "#fff",    
    
    backgroundColor: props.statusColor.main,
    "&:hover": {
      backgroundColor: props.statusColor.dark,
      "@media (hover : none)": {
        backgroundColor: props.statusColor.main,
      },
    },
  }),
  text: (props) => ({
    color: props.statusColor[500],    
  }),
}));

const Status = ({ status, date}) => {
  const statusColor = statusColors[status];  

  const classes = useStyles({ statusColor });
 
  return (
  
    <Button
      key={status}
      variant="contained"
      display="block"
      size="small"
      align="right"
      className={classes.button}
    >
      {status} : {date}
    </Button>
    
  );
};

export default Status;
