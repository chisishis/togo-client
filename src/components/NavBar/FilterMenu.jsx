import React, { useState} from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { statusColors } from "../../util/filter.colors";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";

import { useFilter } from "../../contexts/filter.provider";

const useStyle = makeStyles((theme) => ({
  all: {
    color: "#777",
  },
  created: {
    color: statusColors.created[700],
    "&$checked": {
      color: statusColors.created[800],
    },
  },
  planned: {
    color: statusColors.planned[700],
    "&$checked": {
      color: statusColors.planned[800],
    },
  },
  postponed: {
    color: statusColors.postponed[700],
    "&$checked": {
      color: statusColors.postponed[800],
    },
  },
  cancelled: {
    color: statusColors.cancelled[700],
    "&$checked": {
      color: statusColors.cancelled[800],
    },
  },
  completed: {
    color: statusColors.completed[700],
    "&$checked": {
      color: statusColors.completed[800],
    },
  },
  formGroup: {
    padding: "1px 10px",
  },
  checked: {},
}));

const FilterMenu = () => {


  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const { filter, setFilter } = useFilter();

  const filterMap = new Map()

  const isMenuOpen = Boolean(anchorEl);

  const handleStatusMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setAnchorEl(null);
  };

  

  const handleChange = (e) => {

      const name = e.target.name;
    
    
    
    const tempValue = filter[name];

    let tempFilter = {
      all: false,
      created: false,
      planned: false,
      postponed: false,
      cancelled: false,
      completed: false,
    };

    // check if all is checked
    if (name === "all") {
      Object.keys(tempFilter).forEach((key) => {
        tempFilter[key] = !tempValue;
      });
    } else {
      tempFilter = { ...filter, [e.target.name]: e.target.checked };
    }

    if (
      // check 'All' button when other elements checked
      tempFilter.created &&
      tempFilter.planned &&
      tempFilter.completed &&
      tempFilter.postponed &&
      tempFilter.cancelled &&
      !tempFilter.all
    ) {
      tempFilter = { ...tempFilter, all: true };
    }
    if (
      // un-check 'All' button when other elements unchecked
      !(
        tempFilter.created &&
        tempFilter.planned &&
        tempFilter.completed &&
        tempFilter.postponed &&
        tempFilter.cancelled
      ) &&
      tempFilter.all
    ) {
      tempFilter = { ...tempFilter, all: false };
    }    
    setFilter({ ...tempFilter });
    
  };

  // Control a side effect after state change

  return (
    <React.Fragment>
      <Button
        aria-label="Select filters"
        aria-haspopup="true"
        onClick={handleStatusMenuOpen}
        color="inherit"
        aria-controls="filter-menu"
      >
        Filter
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleStatusMenuClose}
      >
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            className={classes.all}
            control={
              <Checkbox
                className={classes.all}
                checked={filter.all}
                onChange={handleChange}
                name="all"
              />
            }
            label="All"
          />
          <Divider />
          <FormControlLabel
            className={classes.created}
            control={
              <Checkbox
                className={classes.created}
                checked={filter.created}
                onChange={handleChange}
                name="created"
              />
            }
            label="Created"
          />
          <FormControlLabel
            className={classes.planned}
            control={
              <Checkbox
                className={classes.planned}
                checked={filter.planned}
                onChange={handleChange}
                name="planned"
              />
            }
            label="Planned"
          />
          <FormControlLabel
            className={classes.completed}
            control={
              <Checkbox
                className={classes.completed}
                checked={filter.completed}
                onChange={handleChange}
                name="completed"
              />
            }
            label="Completed"
          />
          <FormControlLabel
            className={classes.postponed}
            control={
              <Checkbox
                className={classes.postponed}
                checked={filter.postponed}
                onChange={handleChange}
                name="postponed"
              />
            }
            label="Postponed"
          />
          <FormControlLabel
            className={classes.cancelled}
            control={
              <Checkbox
                className={classes.cancelled}
                checked={filter.cancelled}
                onChange={handleChange}
                name="cancelled"
              />
            }
            label="Cancelled"
          />
        </FormGroup>
    
      </Menu>
    </React.Fragment>
  );
};

export default FilterMenu;
