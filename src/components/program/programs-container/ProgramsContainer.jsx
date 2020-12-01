import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ProgramCard from '../program-card/ProgramCard'
import AddProgramModal from '../add-program-modal/AddProgramModal'
import { Button, toaster } from '../../ui'
import { retrieveAll as retrieveAllPrograms } from '../../../store/modules/program/actions'
import { ACTION_TYPE } from '../../../helper/constants'

const ProgramsContainer = ({ fetchProgramStatus, programs, fetchPrograms }) => {
  const history = useHistory()
  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false)

  useEffect(() => {
    fetchProgramStatus !== ACTION_TYPE.SUCCESS &&
      fetchProgramStatus !== ACTION_TYPE.FAILED &&
      fetchPrograms()
  }, [fetchProgramStatus, fetchPrograms])

  useEffect(() => {
    switch (fetchProgramStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger('Error to retrieve programs')
        break
      case ACTION_TYPE.SUCCESS:
      default:
        break
    }
  }, [fetchProgramStatus])

  const goToEditProgram = (programId) => {
    history.push(`/coach/programs/${programId}/edit`)
  }

  return (
    <div>
      <AddProgramModal
        onClose={() => setIsAddProgramModalOpen(!isAddProgramModalOpen)}
        isOpen={isAddProgramModalOpen}
      />

      <Button
        label="New"
        iconBefore="plus"
        appearance="minimal"
        onClick={() => setIsAddProgramModalOpen(true)}
      />

      <div>
        {programs.map((program) => (
          <ProgramCard
            key={program._id}
            program={program}
            onEdit={() => goToEditProgram(program._id)}
          />
        ))}
      </div>
    </div>
  )
}

ProgramsContainer.propTypes = {
  onAdProgramClicked: PropTypes.func,
  programs: PropTypes.arrayOf(PropTypes.shape({})),
  fetchProgramStatus: PropTypes.string,
}

const mapStateToProps = (state) => ({
  programs: state.program.list,
  fetchProgramStatus: state.program.actions.getAll.status,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPrograms: () => dispatch(retrieveAllPrograms()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsContainer)
