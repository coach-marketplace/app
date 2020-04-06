import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import LibraryNavigation from "../library-navigation/LibraryNavigation";
import Heading from "../../ui/heading/Heading";
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
        <Heading size={800} is="h1">
          Library
        </Heading>

        <LibraryNavigation />

        {this.renderContent()}
      </Fragment>
    );
  }
}

export default LibraryContainer;
