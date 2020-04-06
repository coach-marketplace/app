import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import ServiceForm from "../../components/service/service-form/ServiceForm";
import toaster from "../../components/ui/toaster/toaster";
import { create as createService } from "../../store/modules/service/actions";

class NewServicePage extends React.Component {
  /**
   * Adding empty state because of getDerivedStateFromProps
   *
   * see: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#new-lifecycle-getderivedstatefromprops
   */
  state = {};

  static getDerivedStateFromProps(props, state) {
    const {
      isCreateServiceError,
      isCreateServiceLoading,
      isCreateServiceSuccess,
    } = props;

    if (!isCreateServiceLoading && isCreateServiceSuccess) {
      toaster.success("Service successfully created");
      props.history.push("/services");
    } else if (!isCreateServiceLoading && isCreateServiceError) {
      toaster.danger("Error when creating the service");
    }

    return state;
  }

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
  isCreateServiceSuccess: state.service.actions.create.success,
  isCreateServiceError: state.service.actions.create.error,
});

const mapDispatchToProps = (dispatch) => ({
  createService: (data) => dispatch(createService(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewServicePage);
