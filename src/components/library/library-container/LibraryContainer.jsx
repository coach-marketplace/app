import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import LibraryNavigation from "../library-navigation/LibraryNavigation";
import { Title } from "../../ui";
import ExercisesContainer from "../../exercise/exercises-container/ExercisesContainer";
import WorkoutsContainer from "../../workout/workouts-container/WorkoutsContainer";

class LibraryContainer extends Component {
  static propTypes = {
    type: PropTypes.string,
  };

  renderContent = () => {
    const { type } = this.props;

    switch (type) {
      case "exercises":
        return <ExercisesContainer />;
      case "workouts":
        return <WorkoutsContainer />;
      default:
        return <ExercisesContainer />;
    }
  };

  render() {
    return (
      <Fragment>
        <Title>Library</Title>

        <LibraryNavigation />

        {this.renderContent()}
      </Fragment>
    );
  }
}

export default LibraryContainer;
