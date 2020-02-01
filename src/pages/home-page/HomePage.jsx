import React from "react";
import axios from "axios";

import Header from "../../components/ui/layout/header/Header";

class HomePage extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    const users = axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(results => {
        this.setState({ users: [...results.data] });
      });
  }

  render() {
    console.log(this.props);
    return (
      <div className="page-wrapper">
        <Header>test</Header>
        <ul>
          {this.state.users.map(user => {
            return <li key={user.id}>{user.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default HomePage;
