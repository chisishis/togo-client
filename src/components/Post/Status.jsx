import React from "react";
import { makeStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {statusColors} from '../../util/filter.colors'


const useStyles = makeStyles((theme) => ({
  button: (props) => ({
    color: "#fff",
    margin: theme.spacing(1),
    backgroundColor: props.statusColor[500],
    "&:hover": {
      backgroundColor: props.statusColor[700],
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
    <React.Fragment>
    <Button
      key={status}
      variant="contained"
      display="block"
      size="small"
      align="right"
      className={classes.button}
    >
      {status}
    </Button>
    <Typography variant='body2' component='span' className={classes.text}>
      {date}
    </Typography>
    </React.Fragment>
  );
};

export default Status;
