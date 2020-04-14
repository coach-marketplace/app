import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import BodyForm from "../../components/profile/BodyForm";

class BodyPage extends Component {

    render() {
        if (!this.props.isAutoLoginLoading && !this.props.authUser) {
            return <Redirect to="/login" />;
        }

        return (
            <Layout
                header={<Header />}
                main={
                    <>
                    <BodyForm />
                    </> }
            />
        );
    }
}

const mapStateToProps = state => ({
    isAutoLoginLoading: state.auth.actions.auto_login.loading,
    authUser: state.auth.authUser
  });
  
export default connect(mapStateToProps)(BodyPage);
  