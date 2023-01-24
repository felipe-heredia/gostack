import styled, { keyframes } from 'styled-components'
import { Form } from '@unform/web'
import { LogIn } from 'styled-icons/feather'
import { shade } from 'polished'

import loginBackgroundImage from '../../assets/sign-in-background.png'

export const LoginWrapper = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0px)
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  place-content: center;

  width: 100%;

  animation: ${appearFromLeft} 1s;
`

export const Background = styled.div`
  flex: 1;
  background: url(${loginBackgroundImage}) no-repeat center;
  background-size: cover;
`

export const FormWrapper = styled(Form)`
  margin: 80px 0;
  width: 340px;
  text-align: center;

  h1 {
    margin-bottom: 24px;
  }

  a {
    color: #faede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#faede8')};
    }
  }
`

export const LoginIcon = styled(LogIn)`
  width: 16px;
  height: 16px;
`
