import React, { Component } from "react";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import ProfileForm from "../../components/profile/ProfileForm";

class ProfilePage extends Component {
  render() {
    return <Layout header={<Header />} main={<ProfileForm />} />;
  }
}

export default ProfilePage;
