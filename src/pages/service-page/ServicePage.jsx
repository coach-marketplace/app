import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { retrieveAll as retrieveServices } from "../../store/modules/service/actions";
import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import Button from "../../components/ui/button/Button";
import ServicesContainer from "../../components/service/services-container/ServicesContainer";

class ServicePage extends React.Component {
  componentDidMount() {
    this.props.retrieveServices();
  }

  render() {
    const { isFetchServicesLoading, serviceList } = this.props;

    if (!this.props.isAutoLoginLoading && !this.props.authUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout
        header={<Header />}
        main={
          <Fragment>
            <Link to="/services/new">
              <Button label="New" iconBefore="plus" appearance="minimal" />
            </Link>
            <ServicesContainer
              services={serviceList}
              isLoading={isFetchServicesLoading}
            />
          </Fragment>
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  serviceList: state.service.list,
  isFetchServicesLoading: state.service.actions.getAll.loading,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveServices: () => dispatch(retrieveServices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);
