import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Dialog, Title, toaster, Text, Input, Pane } from '../../ui'
import {
  del as deleteProgram,
  cleanDelete,
} from '../../../store/modules/program/actions'
import { ACTION_TYPE } from '../../../helper/constants'

const AddProgramModal = ({
  isOpen,
  onClose,
  programTitle,
  programId,
  deleteProgramStatus,
  deleteProgram,
  cleanDeleteActionStore,
}) => {
  const history = useHistory()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    switch (deleteProgramStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger('Error in deletion, retry later')
        break
      case ACTION_TYPE.SUCCESS:
        toaster.success('Program successfully deleted')
        cleanDeleteActionStore()
        break
      default:
        return
    }
  }, [cleanDeleteActionStore, deleteProgramStatus, history])

  const deleteProgramHandler = (programId) => {
    deleteProgram(programId, () => {
      history.push('/library/programs')
    })
  }

  return (
    <Dialog
      isShown={isOpen}
      onCloseComplete={onClose}
      title="Delete a program"
      hasHeader={false}
      intent="danger"
      confirmLabel="I understand the consequences, delete this program"
      onConfirm={() => deleteProgramHandler(programId)}
      isConfirmLoading={deleteProgramStatus === ACTION_TYPE.LOADING}
      isConfirmDisabled={inputValue !== programTitle}
    >
      <Pane display="flex" flexDirection="column">
        <Title>Are you absolutely sure?</Title>
        <Text>
          This action <Text is="strong">cannot</Text> be undone. This will
          permanently delete the <Text is="strong">{programTitle}</Text>{' '}
          program, and remove all customers assignations.
        </Text>
        <Text marginTop={10}>
          Please type <Text is="strong">{programTitle}</Text> to confirm.
        </Text>

        <Input
          value={inputValue}
          width="100%"
          marginTop={10}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </Pane>
    </Dialog>
  )
}

AddProgramModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  deleteProgramStatus: state.program.actions.delete.status,
})

const mapDispatchToProps = (dispatch) => ({
  deleteProgram: (id, cb) => dispatch(deleteProgram(id, cb)),
  cleanDeleteActionStore: () => dispatch(cleanDelete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProgramModal)
