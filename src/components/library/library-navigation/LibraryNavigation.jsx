import React from "react";
import { useHistory } from "react-router-dom";

import { StyledNavigation } from "./style";
import Button from "../../ui/button/Button";

const LibraryNavigation = (props) => {
  const history = useHistory();

  const navigation = [
    { label: "Exercises", path: "/library/exercises" },
    { label: "Workouts", path: "/library/workouts" },
    { label: "Programs", path: "/library/programs" },
  ];

  return (
    <StyledNavigation>
      {navigation.map((item) => (
        <Button
          key={item.path}
          label={item.label}
          appearance="minimal"
          onClick={() => history.push(item.path)}
        />
      ))}
    </StyledNavigation>
  );
};

export default LibraryNavigation;
