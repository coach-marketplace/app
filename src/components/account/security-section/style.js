import styled from "styled-components";

import { COLOR, SPACER } from "../../../helper/constants";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  ${({ withBorderTop }) =>
    withBorderTop
      ? `
      border-top: 1px solid ${COLOR.TEXT}77;
      margin-top: ${SPACER.XL};
      padding-top: ${SPACER.XL};
    `
      : `
      border: none;
    `}
`;
