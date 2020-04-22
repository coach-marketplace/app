import React, { Component } from "react";

import { Container, Aside, Section } from "./styled";

class AsideLeftLayout extends Component {
  render() {
    const { aside, section } = this.props;

    return (
      <Container>
        <Aside>{aside}</Aside>
        <Section>{section}</Section>
      </Container>
    );
  }
}

export default AsideLeftLayout;
