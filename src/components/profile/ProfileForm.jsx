import React from "react";
import { TextInputField, Alert, Text, Link } from "evergreen-ui";
import Button from "../ui/button/Button";
import Spinner from "../ui/loader/Spinner"

import { connect } from "react-redux";
import { getProfileInfos } from "../../store/modules/user/selectors";
import { 
    FETCH_USER_PROFILE_INFOS_PENDING,
    FETCH_USER_PROFILE_INFOS_ERROR, 
    UPDATE_USER_PROFILE_INFOS_ERROR,
    UPDATE_USER_PROFILE_INFOS_PENDING,
    UPDATE_USER_PROFILE_INFOS_SUCCESS} from "../../store/modules/user/constants"

import { fetchUserProfileInfos, updateUserProfileInfos } from "../../store/modules/user/user";


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
        this.props.updateUserProfileInfos(this.props.profileData);
    }

    getBasicScreen() {
        return(
            <form key={1} onSubmit={this.onProfileChangeSubmitted}>
                        <TextInputField
                            label="First name"
                            description=""
                            placeholder="Enter your first name"
                            defaultValue={ this.props.profileData.firstName }
                            onChange={ (event) => this.props.profileData.firstName = event.target.value }
                        />
                        <TextInputField
                            label="Last name"
                            description=""
                            placeholder="Enter your last name"
                            defaultValue={ this.props.profileData.lastName }
                            onChange={ (event) => this.props.profileData.lastName = event.target.value }
                        />
                        <TextInputField
                            label="email address"
                            description=""
                            placeholder="Enter your email address"
                            defaultValue={ this.props.profileData.email }
                            onChange={ (event) => this.props.profileData.email = event.target.value }
                        />
                        
                        <Text>Password</Text> <br/>
                        <Link href="/password">Change password</Link>

                        <TextInputField
                            label="Phone number"
                            description=""
                            placeholder="Enter your phone number"
                            defaultValue={ this.props.profileData.phone }
                            onChange={ (event) => this.props.profileData.phone = event.target.value }
                        />
            
                        <Button type="submit" label="Save" />
                    </form>
        )
    }

    render() {
        switch(this.props.profileData.status){
            case FETCH_USER_PROFILE_INFOS_PENDING || UPDATE_USER_PROFILE_INFOS_PENDING :
                return(<Spinner />)
            case FETCH_USER_PROFILE_INFOS_ERROR || UPDATE_USER_PROFILE_INFOS_ERROR :
                return(
                    <Alert
                        intent="danger"
                        title="We encountered an error. Please try again later."
                    />
                )
            case UPDATE_USER_PROFILE_INFOS_SUCCESS:
                    return(
                       [<Alert key={0}
                           intent="success"
                           title="your changes have been successfuly saved."
                       />,
                       this.getBasicScreen()]
                    )
            default:
                return(
                    this.getBasicScreen()
                );
        }
    }

}

const mapStateToProps = state => {
    return {profileData: getProfileInfos(state)};
  };

const mapDispatchToProps = dispatch => ({
    fetchUserProfileInfos: () => dispatch(fetchUserProfileInfos()),
    updateUserProfileInfos: (profileData) => dispatch(updateUserProfileInfos(profileData))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileForm);
