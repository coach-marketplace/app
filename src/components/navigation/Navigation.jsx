import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../ui/button/Button";

const List = styled.ul`
  display: flex;
  height: 40px;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const Navigation = () => {
  return (
    <List className="navigation">
      <ListItem>
        <Link to="/services">
          <Button label="Services" appearance="minimal" />
        </Link>
        <Link to="/customers">
          <Button label="Customers" appearance="minimal" />
        </Link>
        <Link to="/schedule">
          <Button label="Agenda" appearance="minimal" />
        </Link>
        <Link to="/library/exercises">
          <Button label="Library" appearance="minimal" />
        </Link>
      </ListItem>
    </List>
  );
};

export default Navigation;
