import React from "react";
import PropTypes from 'prop-types'

import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    chips: {
      margin: "30px 0 30px 0",
      "& div": {
        margin: "0px 5px",
        backgroundColor: "#2196f3",
        color: "#fff",
        "&: focus": {
            backgroundColor: 'inherit'
        },
        "& span": {
          fontWeight: 700,
          textTransform: "uppercase",
          padding: "1px 12px 0 14px",
        },
      },
    },
  }));


const ChipDisplayComponent = ({chips, deleteHandler}) => {
    const classes = useStyles()
    return (
        <Typography className={classes.chips} component="div" align="left">
        {chips.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            clickable={false}
            onDelete={deleteHandler(tag)}
          />
        ))}
         </Typography>
    )
}

ChipDisplayComponent.propTypes = {
    chips: PropTypes.array.isRequired,
    deleteHandler: PropTypes.func.isRequired
}

export default ChipDisplayComponent
