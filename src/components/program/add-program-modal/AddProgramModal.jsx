import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ProgramForm from '../program-form/ProgramForm'
import { SideModal, Title, toaster } from '../../ui'
import {
  create as createProgram,
  cleanCreate,
} from '../../../store/modules/program/actions'
import { ACTION_TYPE } from '../../../helper/constants'

const AddProgramModal = ({
  isOpen,
  onClose,
  createProgram,
  createProgramStatus,
  cleanCreateActionStore,
}) => {
  const history = useHistory()

  useEffect(() => {
    switch (createProgramStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger('Error in creation, retry later')
        cleanCreateActionStore()
        break
      case ACTION_TYPE.SUCCESS:
        toaster.success('Program successfully created')
        cleanCreateActionStore()
        break
      default:
        return
    }
  }, [cleanCreateActionStore, createProgramStatus])

  const onProgramSubmitted = (data) => {
    createProgram(data, (newProgramId) => {
      history.push(`/coach/programs/${newProgramId}/edit`)
    })
  }

  return (
    <SideModal isShown={isOpen} onCloseComplete={onClose}>
      <Title>Create a program</Title>
      <ProgramForm
        onSubmit={onProgramSubmitted}
        isLoading={createProgramStatus === ACTION_TYPE.LOADING}
      />
    </SideModal>
  )
}

AddProgramModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  createProgramStatus: state.program.actions.create.status,
})

const mapDispatchToProps = (dispatch) => ({
  /**
   * @param {object} data
   * @param {function} callback Callback function who will be trigger on success
   */
  createProgram: (data, callback) => dispatch(createProgram(data, callback)),
  cleanCreateActionStore: () => dispatch(cleanCreate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProgramModal)
