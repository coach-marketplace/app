import styled from "styled-components";

import { MEDIA_QUERY, COLOR } from "../../../helper/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background-color: ${COLOR.BACKGROUND_LIGHT};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: ${({ isFull }) => (isFull ? "calc(100% - 20px)" : "60%")};
  margin: 0 auto;
  padding: 50px 0;

  ${MEDIA_QUERY.L_AND_DOWN} {
    width: ${({ isFull }) => (isFull ? "calc(100% - 20px)" : "75%")};
  }
  ${MEDIA_QUERY.M_AND_DOWN} {
    width: ${({ isFull }) => (isFull ? "calc(100% - 20px)" : "80%")};
  }
  ${MEDIA_QUERY.S_AND_DOWN} {
    width: calc(100% - 20px);
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
`;
