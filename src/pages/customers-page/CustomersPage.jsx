import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import * as actions from "../../store/modules/customer/actions";
import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import CustomersTable from "../../components/customer/customers-table/CustomersTable";

class CustomersPage extends React.Component {
  componentDidMount() {
    !this.props.customerList.length && this.props.getCustomers();
  }

  render() {
    if (!this.props.isAutoLoginLoading && !this.props.authUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout
        header={<Header />}
        main={
          <div>
            <Link to="/customers/new">Add customer</Link>
            {this.props.isGetAllCustomersLoading ? (
              "loading..."
            ) : (
              <CustomersTable customers={this.props.customerList} />
            )}
          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    customerList: state.customer.list,
    isGetAllCustomersLoading: state.customer.actions.get_all.loading,
    isGetAllCustomersError: state.customer.actions.get_all.error,
    isAutoLoginLoading: state.auth.actions.auto_login.loading,
    authUser: state.auth.authUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCustomers: () => dispatch(actions.getAll())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);
