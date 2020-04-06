import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import LibraryContainer from "../../components/library/library-container/LibraryContainer";

class LibraryPage extends React.Component {
  render() {
    const { isAutoLoginLoading, authUser, match } = this.props;

    if (!isAutoLoginLoading && !authUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout
        header={<Header />}
        main={<LibraryContainer type={match.params.type} />}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAutoLoginLoading: state.auth.actions.auto_login.loading,
  authUser: state.auth.authUser,
});

export default connect(mapStateToProps)(LibraryPage);
