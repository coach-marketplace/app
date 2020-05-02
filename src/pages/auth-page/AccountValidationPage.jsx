import React from "react";
import { getAccountValidationState } from "../../store/modules/auth/selectors"
import { validateAccount } from "../../store/modules/auth/auth"
import { connect } from "react-redux";
import styled from "styled-components";
import Icon from "../../components/ui/icons";

import {
    ACCOUNT_VALIDATION_LOADING,
    ACCOUNT_VALIDATION_SUCCESS,
    ACCOUNT_VALIDATION_FAILED,
  } from "../../store/modules/auth/constants";
import Spinner from "../../components/ui/loader/Spinner";

const MessageContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

class AccountValidationPage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.validateAccount({userId: this.props.match.params.userId, token: this.props.match.params.token });
    }

    render() {
        switch(this.props.accountValidation.state) {
            case ACCOUNT_VALIDATION_LOADING:
                return <Spinner /> 
            case ACCOUNT_VALIDATION_FAILED:
                return <MessageContainer>
                    <Icon icon="ban-circle" color="danger" size={30} marginRight={20} />
                    <div>
                    <h1>The following error occured during account validation:</h1><br/>
                    <h2>{this.props.accountValidation.error}</h2><br/>
                    <p>If you have already activated your account, try <a href="/login">logging in</a></p>
                    <p>If not, retry using the link we provided in the email we sent you during registration. 
                       If this problem persists, contact us via <a href="mailto:webmaster@example.com">projectcoachmarketplace@gmail.com</a></p>
                    </div>
                </MessageContainer>
            case ACCOUNT_VALIDATION_SUCCESS:
                return <MessageContainer>
                    <Icon icon="tick-circle" color="success" size={30} marginRight={20} />
                    <div>
                    <h1>Welcome to Coach-Marketplace!</h1><br/>
                    <h2>Your account has been successfully activated</h2><br/>
                    <p>You can now start using our services by <a href="/login">logging in</a></p>
                    </div>
                </MessageContainer>
            default:
                return <MessageContainer>
                    <h1>Welcome to Coach-Marketplace!</h1><br/>
                    <h2>CHeck your emails for our validation email</h2>
                </MessageContainer>
        }
    }
}

const mapStateToProps = (state) => ({
    accountValidation: getAccountValidationState(state),
});
  
  const mapDispatchToProps = (dispatch) => ({
    validateAccount: (data) => dispatch(validateAccount(data)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AccountValidationPage);