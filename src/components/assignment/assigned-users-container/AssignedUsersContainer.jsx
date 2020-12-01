import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AssignUserModal from '../assign-user-modal/AssignUserModal'
import { Button } from '../../ui'

const AssignedUsersContainer = ({ programId, getAssignments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const renderAssignedUsers = () => {
    const assignments = getAssignments(programId)

    return assignments ? assignments.length : 0
  }

  return (
    <div>
      <AssignUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programId={programId}
      />
      <h2>Assigned customers</h2>
      <div>{renderAssignedUsers()}</div>
      <Button onClick={() => setIsModalOpen(true)}>Assign</Button>
    </div>
  )
}

AssignedUsersContainer.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.string),
  getCustomer: PropTypes.func,
  fetchCustomer: PropTypes.func,
}

AssignedUsersContainer.defaultProps = {
  userIds: [],
}

const mapStateToProps = (state) => ({
  getAssignments: (programId) => state.assignment.list[programId],
})

export default connect(mapStateToProps)(AssignedUsersContainer)
