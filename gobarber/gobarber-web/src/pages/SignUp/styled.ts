import styled, { keyframes } from 'styled-components'
import { ArrowLeft } from 'styled-icons/feather'
import { shade } from 'polished'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'

import signUpBackgroundImage from '../../assets/sign-up-background.png'

export const LoginWrapper = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to {
    opacity: 1;
    transform: translateX(0px)
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;

  animation: ${appearFromRight} 1s;

  a {
    color: #f4ede8;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')}
    }

    svg {
      margin-right: 6px;
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImage}) no-repeat center;
  background-size: cover;
`

export const FormWrapper = styled(Form)`
  margin: 80px 0;
  width: 340px;
  text-align: center;

  h1 {
    margin-bottom: 24px;
  }
`

export const InternalLink = styled(Link)`
  color: #faede8;
  display: block;
  margin-top: 24px;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${shade(0.2, '#faede8')}
  }
`

export const ArrowIcon = styled(ArrowLeft)`
  width: 16px;
  height: 16px;
`
