import React from "react";
import PropTypes from "prop-types";

import Pane from "../../ui/pane/Pane";
import Text from "../../ui/text/Text";

const ExerciseCard = ({ title, onClick }) => {
  return (
    <Pane
      elevation={1}
      display="flex"
      justifyContent="flexStart"
      alignItems="center"
      padding={20}
      marginTop={10}
      onClick={onClick}
    >
      <Text>{title}</Text>
    </Pane>
  );
};

ExerciseCard.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default ExerciseCard;
