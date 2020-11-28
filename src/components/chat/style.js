import styled from 'styled-components'

import { COLOR, SPACER } from '../../helper/constants'

export const ChatContainer = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR.TEXT};
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`

export const ChatMessagesContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  background-color: white;
`

export const ChatHeader = styled.header`
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${COLOR.TEXT};
  box-sizing: border-box;
  padding: ${SPACER.M};
  align-items: center;
`

export const ChatForm = styled.form`
  display: flex;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${COLOR.TEXT};
  align-items: center;
`

export const InputWrapper = styled.div`
  flex-grow: 1;
  height: 100%;

  > input {
    width: 100%;
    height: 100%;
    box-shadow: none;
    padding-left: ${SPACER.L};
    font-size: 16px;
  }
`
