import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import LibraryNavigation from "../library-navigation/LibraryNavigation";
import Title from "../../ui/typography/Title";
import ExercisesContainer from "../../exercise/exercises-container/ExercisesContainer";

class LibraryContainer extends Component {
  static propTypes = {
    type: PropTypes.string,
  };

  renderContent = () => {
    const { type } = this.props;

    switch (type) {
      case "exercises":
        return <ExercisesContainer />;
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
