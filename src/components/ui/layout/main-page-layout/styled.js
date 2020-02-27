import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 70px;
  min-height: 70px;
  background-color: AliceBlue;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 50px 10%;
`;
export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
`;
