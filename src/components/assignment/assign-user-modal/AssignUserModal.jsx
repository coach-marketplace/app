import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Dialog,
  Pane,
  Text,
  Checkbox,
  Form,
  DayPicker,
  toaster,
} from "../../ui";
import UserCard from "../../user/user-card/UserCard";
import { retrieveAll as fetchCustomers } from "../../../store/modules/customer/actions";
import { create, cleanCreate } from "../../../store/modules/assignment/actions";
import { ACTION_TYPE } from "../../../helper/constants";

const AssignUserModal = ({
  isOpen,
  onClose,
  customers,
  fetchContacts,
  createAssignment,
  createAssignmentStatus,
  cleanCreateAssignmentStore,
  programId,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [idsDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    if (customers.length) return;
    fetchContacts();
  }, [customers.length, fetchContacts, isOpen]);

  useEffect(() => {
    switch (createAssignmentStatus) {
      case ACTION_TYPE.SUCCESS:
        cleanCreateAssignmentStore();
        onClose();
        break;
      case ACTION_TYPE.FAILED:
        toaster.danger("Error during the assignment, retry later");
        cleanCreateAssignmentStore();
        break;
      default:
        return;
    }
  }, [cleanCreateAssignmentStore, createAssignmentStatus, onClose]);

  const handleUsersChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedUsersClone = [...selectedUsers];

    if (selectedUsers.includes(value)) {
      const valueIndex = selectedUsers.indexOf(value);
      selectedUsersClone.splice(valueIndex, 1);
      setSelectedUsers(selectedUsersClone);
    } else {
      selectedUsersClone.push(value);
      setSelectedUsers(selectedUsersClone);
    }
  };

  const handleSubmit = () => {
    console.log("program id", programId);
    console.log("data", {
      traineeIds: selectedUsers,
      startDate: startDate.toISOString(),
    });
    // createAssignment(programId, {
    //   traineeIds: selectedUsers,
    //   startDate: startDate.toISOString(),
    // });
  };

  return (
    <Dialog
      isShown={isOpen}
      onCloseComplete={onClose}
      title="Assign customers"
      width={700}
      onConfirm={handleSubmit}
      isConfirmLoading={createAssignmentStatus === ACTION_TYPE.LOADING}
    >
      <Form onSubmit={handleSubmit}>
        <Pane display="flex" width="50%">
          <Pane width="100%" flexDirection="column">
            <Text>{`Selected (${selectedUsers.length})`}</Text>
            {customers.map((customer) => {
              return (
                <Pane display="flex" key={customer._id} alignItems="center">
                  <Checkbox
                    name="selectedUserIds"
                    value={customer._id}
                    onChange={handleUsersChange}
                    checked={selectedUsers.includes(customer._id)}
                  />
                  <UserCard userData={customer} />
                </Pane>
              );
            })}
          </Pane>
          <Pane>
            <Text>Starting day</Text>
            <DayPicker
              date={startDate}
              onDateChange={(date) => setStartDate(date)}
              focused={idsDatePickerOpen}
              onFocusChange={({ focused }) => setIsDatePickerOpen(focused)}
              id="day-picker"
              numberOfMonths={1}
              hideKeyboardShortcutsPanel={true}
              firstDayOfWeek={1}
            />
          </Pane>
        </Pane>
      </Form>
    </Dialog>
  );
};

AssignUserModal.propTypes = {
  createWorkoutStatus: PropTypes.string,
  customers: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = (state) => ({
  customers: state.customer.list.map((contact) => contact.lead),
  createAssignmentStatus: state.assignment.actions.create.status,
});

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => dispatch(fetchCustomers()),
  createAssignment: (programId, data) => dispatch(create(programId, data)),
  cleanCreateAssignmentStore: () => dispatch(cleanCreate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignUserModal);
