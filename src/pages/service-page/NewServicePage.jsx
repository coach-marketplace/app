import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import ServiceForm from "../../components/service/service-form/ServiceForm";
import { create as createService } from "../../store/modules/service/actions";

class NewServicePage extends React.Component {
  render() {
    const {
      authUser,
      isAutoLoginLoading,
      isCreateServiceLoading,
      createService,
      history,
    } = this.props;

    if (!isAutoLoginLoading && !authUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout
        header={<Header />}
        main={
          <Fragment>
            <ServiceForm
              isLoading={isCreateServiceLoading}
              onSubmit={createService}
              onCancel={() => history.push("/services")}
            />
          </Fragment>
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser,
  isCreateServiceLoading: state.service.actions.create.loading,
});

const mapDispatchToProps = (dispatch) => ({
  createService: (data) => dispatch(createService(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewServicePage);
