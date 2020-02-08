import React from "react";
import axios from "axios";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";

class HomePage extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then(results => {
      this.setState({ users: [...results.data] });
    });
  }

  render() {
    return (
      <Layout
        header={<Header />}
        main={
          <ul>
            {this.state.users.map(user => {
              return <li key={user.id}>{user.name}</li>;
            })}
          </ul>
        }
      />
    );
  }
}

export default HomePage;
