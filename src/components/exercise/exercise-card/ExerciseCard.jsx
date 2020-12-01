import React from 'react'
import PropTypes from 'prop-types'

import { Pane, Text, Button } from '../../ui'

const ExerciseCard = ({ title, onEdit }) => {
  return (
    <Pane
      elevation={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingTop={5}
      paddingBottom={5}
      paddingLeft={10}
      paddingRight={10}
      marginTop={10}
      background="white"
    >
      <Text>{title}</Text>
      <Button iconBefore="edit" appearance="minimal" onClick={onEdit} />
    </Pane>
  )
}

ExerciseCard.propTypes = {
  title: PropTypes.string,
  onEdit: PropTypes.func,
}

export default ExerciseCard
