import React, { Component } from "react";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import AsideLeftLayout from "../../components/layout/aside-left-layout/AsideLeftLayout";
import AsideAccountNav from "../../components/account/aside-account-nav/AsideAccountNav";

import ProfileForm from "../../components/profile/profile-form/ProfileForm";
import UserMetricsContainer from "../../components/profile/user-metrics-container/UserMetricsContainer";
import SecuritySection from "../../components/account/security-section/SecuritySection";

class AccountPage extends Component {
  renderSection = () => {
    const {
      match: {
        params: { section },
      },
    } = this.props;

    switch (section) {
      case "profile":
        return <ProfileForm />;
      case "metrics":
        return <UserMetricsContainer />;
      case "account-and-security":
        return <SecuritySection />;
      default:
        return <ProfileForm />;
    }
  };

  render() {
    return (
      <Layout
        header={<Header />}
        main={
          <AsideLeftLayout
            aside={<AsideAccountNav />}
            section={this.renderSection()}
          />
        }
      />
    );
  }
}

export default AccountPage;
