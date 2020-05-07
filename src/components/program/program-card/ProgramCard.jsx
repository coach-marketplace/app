import React from "react";
import PropTypes from "prop-types";

import { Pane, Text } from "../../ui";

const getDescriptionCard = (program) => {
  let content = `${program.days} days`;

  if (program.content && program.content.length) {
    content += " — ";
    if (program.content[0].description.length > 30) {
      content += program.content[0].description.slice(0, 31);
      content += "...";
    } else {
      content += program.content[0].description;
    }
  }

  return content;
};

const ProgramCard = ({ program, onClick }) => {
  return (
    <Pane
      elevation={1}
      hoverElevation={2}
      display="flex"
      alignItems="center"
      padding={20}
      margin={10}
      onClick={onClick}
      background="white"
    >
      <Pane display="flex" flexDirection="column">
        <Text size={500} marginBottom={5}>
          {program.content[0].title}
        </Text>
        <Text size={300}>{getDescriptionCard(program)}</Text>
      </Pane>
      <Pane display="flex" flexGrow="1" justifyContent="flex-end" height="100%">
        <Text>0 Clients</Text>
      </Pane>
    </Pane>
  );
};

ProgramCard.propTypes = {
  program: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func,
};

export default ProgramCard;
