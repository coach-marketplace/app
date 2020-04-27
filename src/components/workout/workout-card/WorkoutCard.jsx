import React from "react";
import PropTypes from "prop-types";

const WorkoutCard = ({ workout }) => {
  return <p>workout card</p>;
};

WorkoutCard.propTypes = {
  workout: PropTypes.shape({}).isRequired,
};

// WorkoutCard.defaultProps = {}

export default WorkoutCard;
