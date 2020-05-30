import React from "react";
import styled from "styled-components";

import Text from "../typography/Text";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const NoResultText = () => (
  <StyledContainer>
    <Text>No result</Text>
  </StyledContainer>
);

NoResultText.displayName = "NoResultText";

export default NoResultText;
