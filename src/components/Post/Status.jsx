import React from "react";
import { makeStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {statusColors} from '../../util/filter.colors'


const useStyles = makeStyles((theme) => ({
  button: (props) => ({
    marginTop: 10,
    color: "#fff",
    
    
    backgroundColor: props.statusColor[500],
    "&:hover": {
      backgroundColor: props.statusColor[600],
      "@media (hover : none)": {
        backgroundColor: props.statusColor[500],
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
