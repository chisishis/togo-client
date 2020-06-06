import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";
import { setFilter } from "../../redux/filter/fiter.actions";

import { statusColors } from "../../util/filter.colors";

const useStyle = makeStyles((theme) => ({
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
    padding: theme.spacing(1),
  },
  checked: {},
  label: {
    marginLeft: 0,
  },
}));

/**
 * Filter Dialog
 *
 * @param filter
 * @param setFilter
 */

const Filter = ({ filters, setFilter }) => {
  const classes = useStyle();

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

  const StatusLabel = ({ status }) => (
    <FormControlLabel
      className={classes.label}
      control={
        <Checkbox
          color="default"
          className={classes[status]}
          checked={filters[status]}
          onChange={handleChange}
          name={status}
        />
      }
      label={status.charAt(0).toUpperCase() + status.slice(1)}
    />
  );

  return (
    <FormGroup className={classes.formGroup}>
      <StatusLabel status="all" />
      <Divider />
      <StatusLabel status="created" />
      <StatusLabel status="planned" />
      <StatusLabel status="completed" />
      <StatusLabel status="postponed" />
      <StatusLabel status="cancelled" />
    </FormGroup>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => dispatch(setFilter(filter)),
});

const mapStateToProps = (state) => {
  return { filters: state.filters };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
