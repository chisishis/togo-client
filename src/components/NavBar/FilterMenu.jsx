import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { statusColors } from "../../util/filter.colors";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";

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
  const [filter, setFilter] = useState({
    all: true,
    created: true,
    planned: true,
    postponed: true,
    cancelled: true,
    completed: true,
  });

  const isMenuOpen = Boolean(anchorEl);

  const handleStatusMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const name = e.target.name;

    // check if all is checked
    if (name === "all") {
      if (filter[name] === false) {
        setFilter({
          all: true,
          created: true,
          planned: true,
          postponed: true,
          cancelled: true,
          completed: true,
        });
      } else {
        setFilter({
          all: false,
          created: false,
          planned: false,
          postponed: false,
          cancelled: false,
          completed: false,
        });
      }
    } else {
      // if something else was checked.
      setFilter({ ...filter, all: false, [e.target.name]: e.target.checked });
    }
  };


  // Control a side effect after state change
  useEffect(() => {
    if (
      filter.created &&
      filter.planned &&
      filter.completed &&
      filter.postponed &&
      filter.cancelled &&
      !filter.all
    ) {
      setFilter({ ...filter, all: true });
    }
    if (
      !filter.created &&
      !filter.planned &&
      !filter.completed &&
      !filter.postponed &&
      !filter.cancelled &&
      filter.all
    ) {
      setFilter({ ...filter, all: false });
    }
  }, [filter]);

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
