import React from 'react'
import PropTypes from 'prop-types'

import { Pane, Text, Button } from '../../ui'

const getDescriptionCard = (program) => {
  let content = `${program.days} days`

  if (program.content && program.content.length) {
    content += ' — '
    if (program.content[0].description.length > 30) {
      content += program.content[0].description.slice(0, 31)
      content += '...'
    } else {
      content += program.content[0].description
    }
  }

  return content
}

const ProgramCard = ({ program, onEdit }) => {
  return (
    <Pane
      elevation={1}
      display="flex"
      alignItems="flex-start"
      padding={10}
      marginTop={10}
      background="white"
    >
      <Pane
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        flexGrow="1"
        height="100%"
      >
        <Text size={500} marginBottom={5}>
          {program.content[0].title}
        </Text>
        <Text size={300}>{getDescriptionCard(program)}</Text>
      </Pane>
      <Pane display="flex" alignItems="center">
        <Button appearance="minimal" onClick={onEdit} size={300}>
          manage
        </Button>
      </Pane>
    </Pane>
  )
}

ProgramCard.propTypes = {
  program: PropTypes.shape({}).isRequired,
  onEdit: PropTypes.func,
}

export default ProgramCard
