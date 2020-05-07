import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ExerciseCard from "../exercise-card/ExerciseCard";
import AddExerciseFormModal from "../add-exercise-form-modal/AddExerciseFormModal";
import UpdateExerciseFormModal from "../update-exercise-form-modal/UpdateExerciseFormModal";
import { Button, toaster } from "../../ui";
import {
  retrieveAll as retrieveAllExercises,
  create as createExercise,
} from "../../../store/modules/exercise/actions";
import { ACTION_TYPE } from "../../../helper/constants";

const ExercisesContainer = ({
  fetchExercises,
  exercises,
  createExerciseStatus,
  fetchExerciseStatus,
}) => {
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
  const [exerciseIdSelected, setExerciseIdSelected] = useState(null);

  useEffect(() => {
    fetchExerciseStatus !== ACTION_TYPE.SUCCESS && fetchExercises();
  }, [fetchExerciseStatus, fetchExercises]);

  // useEffect(() => {
  //   !isFetchProgramsLoading && !isFetchProgramsSuccess && fetchPrograms();
  // }, [fetchPrograms, isFetchProgramsLoading, isFetchProgramsSuccess]);

  useEffect(() => {
    switch (fetchExerciseStatus) {
      case ACTION_TYPE.FAILED:
        toaster.danger("Error to retrieve exercises");
        break;
      case ACTION_TYPE.SUCCESS:
      default:
        break;
    }
  }, [fetchExerciseStatus]);

  // useEffect(() => {}, []);

  return (
    <div>
      <AddExerciseFormModal
        onToggle={() => setIsAddExerciseModalOpen(!isAddExerciseModalOpen)}
        isOpen={isAddExerciseModalOpen}
        isLoading={createExerciseStatus === ACTION_TYPE.LOADING}
      />
      <UpdateExerciseFormModal
        onClose={() => setExerciseIdSelected(null)}
        exerciseId={exerciseIdSelected}
      />

      <Button
        label="New"
        iconBefore="plus"
        appearance="minimal"
        onClick={() => setIsAddExerciseModalOpen(!isAddExerciseModalOpen)}
      />

      <div>
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise._id}
            title={exercise.content[0].name}
            onClick={() => setExerciseIdSelected(exercise._id)}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  exercises: state.exercise.list,
  fetchExerciseStatus: state.exercise.actions.getAll.status,
});

const mapDispatchToProps = (dispatch) => ({
  createExercise: (data) => dispatch(createExercise(data)),
  fetchExercises: () => dispatch(retrieveAllExercises()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesContainer);
