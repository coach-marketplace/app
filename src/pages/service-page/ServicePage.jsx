import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { retrieveAll as retrieveServices } from "../../store/modules/service/actions";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import Button from "../../components/ui/button/Button";
import ServicesContainer from "../../components/service/services-container/ServicesContainer";

class ServicePage extends React.Component {
  componentDidMount() {
    const { retrieveServices, serviceList } = this.props;

    !serviceList.length && retrieveServices();
  }

  render() {
    const { isFetchServicesLoading, serviceList } = this.props;

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
  serviceList: state.service.list,
  isFetchServicesLoading: state.service.actions.getAll.loading,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveServices: () => dispatch(retrieveServices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);
