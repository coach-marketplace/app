import React from "react";
import PropTypes from "prop-types";

import { Pane, Text } from "../../ui";

const WorkoutCard = ({ workout, onClick }) => {
  return (
    <Pane
      elevation={1}
      width={200}
      display="flex"
      alignItems="center"
      flexDirection="column"
      padding={20}
      margin={10}
      onClick={onClick}
    >
      <Text>{workout.content[0].title}</Text>
    </Pane>
  );
};

WorkoutCard.propTypes = {
  workout: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func,
};

export default WorkoutCard;
