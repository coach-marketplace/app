import React from "react";
import PropTypes from "prop-types";

import { Pane, Text, Button } from "../../ui";

const WorkoutCard = ({ workout, onEdit }) => {
  return (
    <Pane
      elevation={1}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={20}
      margin={10}
      background="white"
    >
      <Text>{workout.content[0].title}</Text>
      <Button iconBefore="edit" appearance="minimal" onClick={onEdit} />
    </Pane>
  );
};

WorkoutCard.propTypes = {
  workout: PropTypes.shape({}).isRequired,
  onEdit: PropTypes.func,
};

export default WorkoutCard;
