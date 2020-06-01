import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import dayjs from "dayjs";

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

const PostStatus = ({ status }) => {

  const statusObject = status[0]
  const {type, date} = statusObject

  const statusDate = dayjs(date).format("MMM DD, YYYY");
  const statusColor = statusColors[type];  

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
      {type} : {statusDate}
    </Button>
    
  );
};

PostStatus.protoType = {
  status: PropTypes.object.isRequired,
};


export default PostStatus;
