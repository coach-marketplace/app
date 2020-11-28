import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AssignUserModal from "../assign-user-modal/AssignUserModal";
// import { fetchOne as fetchCustomer } from "../../../store/modules/customer/actions";
import { Button } from "../../ui";

const AssignedUsersContainer = ({
  programId,
  getAssignments,
  fetchCustomer,
}) => {
  // const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // if (!userIds.length) return;
    // userIds.forEach((userId) => {
    //   const userIndex = users.findIndex((user) => user._id === userId);
    //   console.log("userIndex", userIndex);
    //   if (userIndex === -1) {
    //     fetchCustomer(userId, (fetchedUser) => {
    //       const newUsers = [...users, fetchedUser];
    //       setUsers(newUsers);
    //     });
    //   }
    // });
  }, []);

  const renderAssignedUsers = () => {
    const assignments = getAssignments(programId);

    return assignments ? assignments.length : 0;
  };

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
  );
};

AssignedUsersContainer.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.string),
  getCustomer: PropTypes.func,
  fetchCustomer: PropTypes.func,
};

AssignedUsersContainer.defaultProps = {
  userIds: [],
};

const mapStateToProps = (state) => ({
  getAssignments: (programId) => state.assignment.list[programId],
});

const mapDispatchToProps = (dispatch) => ({
  // fetchCustomer: (userId, callback) =>
  //   dispatch(fetchCustomer(userId, callback)),
  // cleanFetchProgramActionStore: () => dispatch(cleanGetProgram()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignedUsersContainer);
