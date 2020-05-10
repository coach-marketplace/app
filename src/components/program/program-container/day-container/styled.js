import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
  padding: 8px;
  min-height: 150px;
  ${({ cols }) => {
    const minWidth = 14.28;
    const width = 100 / cols;

    if (width < minWidth) {
      return `width: ${minWidth}%;`;
    }

    return `width: ${width}%;`;
  }}
`;
