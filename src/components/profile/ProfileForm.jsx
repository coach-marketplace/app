import React from "react";
import { TextInputField } from "evergreen-ui";
import { connect } from "react-redux";

import Button from "../ui/button/Button";

// TODO: make this page functional
class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      phone: props.user.phone,
    };
  }

  onProfileChangeSubmitted = (event) => {
    event.preventDefault();
    // this.props.updateUserProfileInfos(this.state);
    console.log(this.state);
  };

  render() {
    const { firstName, lastName, phone } = this.state;

    return (
      <form key={1} onSubmit={this.onProfileChangeSubmitted}>
        <TextInputField
          label="First name"
          placeholder="First name"
          value={firstName}
          onChange={(event) => this.setState({ firstName: event.target.value })}
        />

        <TextInputField
          label="Last name"
          placeholder="Last name"
          value={lastName}
          onChange={(event) => this.setState({ lastName: event.target.value })}
        />

        <TextInputField
          label="Phone"
          placeholder="Phone number"
          value={phone}
          onChange={(event) => this.setState({ phone: event.target.value })}
        />
        <Button type="submit" label="Save" />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.current,
});

const mapDispatchToProps = (dispatch) => ({
  // updateUserProfileInfos: (profileData) =>
  //   dispatch(updateUserProfileInfos(profileData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
