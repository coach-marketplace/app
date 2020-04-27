import styled from "styled-components";

import { SYSTEM_COLOR } from "../../../helper/constants";

export const MessageContainer = styled.div`
  display: flex;
  margin: 5px;
  justify-content: ${({ isLeft }) => (isLeft ? "flex-start" : "flex-end")};
`;

export const MessageWrapper = styled.div`
  display: flex;
  max-width: 60%;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: ${({ isLeft }) => (isLeft ? "0" : "10px")};
  border-bottom-right-radius: ${({ isLeft }) => (isLeft ? "10px" : "0")};
  background-color: ${({ isLeft }) =>
    isLeft ? SYSTEM_COLOR.BACKGROUND_LIGHT : SYSTEM_COLOR.PRIMARY};
  color: ${({ isLeft }) => (isLeft ? "inherit" : "white")};
`;
