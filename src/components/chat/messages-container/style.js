import styled from "styled-components";

import { SYSTEM_COLOR } from "../../../helper/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  border: 1px solid ${SYSTEM_COLOR.BACKGROUND_LIGHT};
`;
