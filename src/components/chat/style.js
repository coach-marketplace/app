import styled from "styled-components";

export const ChatContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ChatHeader = styled.header`
  display: flex;
  background-color: lightcyan;
  width: 100%;
  height: 60px;
`;

export const ChatMessagesContainer = styled.div`
  display: flex;
  background-color: lightgoldenrodyellow;
  width: 100%;
  flex-grow: 1;
`;

export const ChatForm = styled.form`
  display: flex;
  background-color: lightpink;
  width: 100%;
  height: 60px;
`;
