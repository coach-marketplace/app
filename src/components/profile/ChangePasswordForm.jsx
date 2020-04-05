import React from "react";
import { Alert, TextInputField } from "evergreen-ui";
import Button from "../ui/button/Button";
import Spinner from "../ui/loader/Spinner"


import { connect } from "react-redux";
import { getChangePasswordInfos } from "../../store/modules/user/selectors";
import { 
    UPDATE_USER_PASSWORD_PENDING,
    UPDATE_USER_PASSWORD_SUCCESS, 
    UPDATE_USER_PASSWORD_ERROR, } from "../../store/modules/user/constants"

import { changeUserPassword } from "../../store/modules/user/user";


class ChangePasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPwd: "",
            newPwd: "",
            newPwdConf: ""
        };
        this.onChangePasswordSubmitted = this.onChangePasswordSubmitted.bind(this);
    }

    onChangePasswordSubmitted(event) {
        event.preventDefault();
        this.props.changeUserPassword(this.state);
    }

    getBasicScreen() {
        return(
            <form key={1} onSubmit={this.onChangePasswordSubmitted}>
                        <TextInputField
                            label="Current password"
                            placeholder="Enter your current password"
                            required={true}
                            type="password"
                            onChange={ (event) => this.setState({oldPwd:event.target.value}) }
                        />
                        <TextInputField
                            label="New password"
                            description=""
                            placeholder="Enter your new password"
                            required={true}
                            type="password"
                            onChange={ (event) => this.setState({newPwd:event.target.value}) }
                        />
                        <TextInputField
                            label="Confirm new password"
                            placeholder="Confirm your new password"
                            required={true}
                            type="password"
                            onChange={ (event) => this.setState({newPwdConf:event.target.value}) }
                        />
                        
                        <Button type="submit" label="save" />
                    </form>
        )
    }

    render() {
        console.log(this.props.passwordData.status)
        switch(this.props.passwordData.status){
            case UPDATE_USER_PASSWORD_PENDING :
                return(<Spinner />)
            case UPDATE_USER_PASSWORD_ERROR :
                return(
                    [<Alert key={0}
                        intent="danger"
                        title={this.props.passwordData.message}
                    />,
                    this.getBasicScreen()]
                )
            case UPDATE_USER_PASSWORD_SUCCESS:
                console.log("coucou")
                    return(
                       [<Alert key={0}
                           intent="success"
                           title={this.props.passwordData.message}
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
    return {passwordData: getChangePasswordInfos(state)};
  };

const mapDispatchToProps = dispatch => ({
    changeUserPassword: (newPassword) => dispatch(changeUserPassword(newPassword))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswordForm);
