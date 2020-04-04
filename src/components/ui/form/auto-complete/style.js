import styled from "styled-components";

import { COLOR, Z_INDEX } from "../../../../helper/constants";

export const StyledContainer = styled.div`
  position: relative;
`;

export const StyledDropdown = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  min-height: 100px;
  top: 100%;
  border: 1px solid ${COLOR.CORNFLOWER_BLUE};
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: ${Z_INDEX.DROPDOWN};
  display: flex;
  flex-direction: column;
`;

export const StyledDropdownItem = styled.li`
  display: flex;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;
