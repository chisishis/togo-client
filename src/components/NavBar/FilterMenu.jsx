/**
 *
 * Component for Filter
 *
 */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { statusColors } from "../../util/filter.colors";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";

import { connect } from "react-redux";
import { setFilter } from "../../redux/filter/fiter.actions";

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

const FilterMenu = ({ filters, setFilter }) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleStatusMenuOpen = (e) => {
     setAnchorEl(e.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = filters[key];
    const countTrueNumbers = Object.values(filters).reduce(
      (acc, item) => acc + item,
      0
    );

    const setAll = (flag) => ({
      all: flag,
      created: flag,
      planned: flag,
      postponed: flag,
      cancelled: flag,
      completed: flag,
    });

    // check if all is checked
    if (key === "all") {
      setFilter(setAll(!value));
    } else if (
      countTrueNumbers === Object.values(filters).length - 2 &&
      !value
    ) {
      setFilter(setAll(true));
    } else if (countTrueNumbers === Object.values(filters).length) {
      setFilter({ ...filters, [key]: false, all: false });
    } else {
      setFilter({ ...filters, [key]: !value });
    }
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
                checked={filters.all}
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
                checked={filters.created}
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
                checked={filters.planned}
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
                checked={filters.completed}
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
                checked={filters.postponed}
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
                checked={filters.cancelled}
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

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => dispatch(setFilter(filter)),
});

const mapStateToProps = (state) => {
  return { filters: state.filters };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
