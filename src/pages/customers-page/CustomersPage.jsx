import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../store/modules/customer/actions";
import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import CustomersTable from "../../components/customer/customers-table/CustomersTable";

class CustomersPage extends React.Component {
  componentDidMount() {
    const { customerList, getCustomers } = this.props;

    !customerList.length && getCustomers();
  }

  render() {
    const { isGetAllCustomersLoading, customerList } = this.props;

    return (
      <Layout
        header={<Header />}
        main={
          <div>
            <Link to="/customers/new">Add customer</Link>
            {isGetAllCustomersLoading ? (
              "loading..."
            ) : (
              <CustomersTable customers={customerList} />
            )}
          </div>
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customerList: state.customer.list,
    isGetAllCustomersLoading: state.customer.actions.getAll.loading,
    isGetAllCustomersError: state.customer.actions.getAll.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomers: () => dispatch(actions.getAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);
