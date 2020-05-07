import styled from "styled-components";

import { COLOR } from "../../../helper/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  border: 1px solid ${COLOR.BACKGROUND_LIGHT};
`;
