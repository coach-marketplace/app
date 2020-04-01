import React from "react";
import { TextInputField, Alert } from "evergreen-ui";
import Button from "../ui/button/Button";
import Spinner from "../ui/loader/Spinner"

import { connect } from "react-redux";
import { getProfileInfos } from "../../store/modules/user/selectors";
import { 
    FETCH_USER_PROFILE_INFOS_PENDING,
    FETCH_USER_PROFILE_INFOS_ERROR } from "../../store/modules/user/constants"

import { fetchUserProfileInfos } from "../../store/modules/user/user";


class ProfileForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onProfileChangeSubmitted = this.onProfileChangeSubmitted.bind(this);
    }

    componentDidMount() {
        this.props.fetchUserProfileInfos();
    }

    onProfileChangeSubmitted(event) {
        event.preventDefault();
    }

    render() {
        switch(this.props.status){
            case FETCH_USER_PROFILE_INFOS_PENDING :
                return(<Spinner />)
            case FETCH_USER_PROFILE_INFOS_ERROR :
                return(
                    <Alert
                        intent="danger"
                        title="We encountered an error. Please try again later."
                    />
                )
            default:
                return(
                    <form onSubmit={this.onProfileChangeSubmitted}>
                        <TextInputField
                            label="First name"
                            description=""
                            placeholder="Enter your first name"
                            defaultValue={ this.props.firstName }
                        />
                        <TextInputField
                            label="Last name"
                            description=""
                            placeholder="Enter your last name"
                            defaultValue={ this.props.lastName }
                        />
                        <TextInputField
                            label="email address"
                            description=""
                            placeholder="Enter your email address"
                            defaultValue={ this.props.email }
                        />
                        <TextInputField
                            label="Phone number"
                            description=""
                            placeholder="Enter your phone number"
                            defaultValue={ this.props.phoneNumber }
                        />
                        <Button type="submit" label="Save" />
                    </form>
                );
        }
    }

}

const mapStateToProps = state => {
    return getProfileInfos(state);
  };

const mapDispatchToProps = dispatch => ({
    fetchUserProfileInfos: () => dispatch(fetchUserProfileInfos())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);
