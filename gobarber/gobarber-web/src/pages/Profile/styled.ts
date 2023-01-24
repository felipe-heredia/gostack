import styled from 'styled-components'
import { Form } from '@unform/web'
import { Camera, ArrowLeft } from 'styled-icons/feather'
import { shade } from 'polished'
import { Link } from 'react-router-dom'

export const LoginWrapper = styled.div``

export const Header = styled.header`
  height: 130px;
  background: #28262e;
  display: flex;
  align-items: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -160px auto 0;

  place-content: center;

  width: 100%;
`

export const AvatarWrapper = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`

export const CameraIcon = styled(Camera)`
  width: 20px;
  height: 20px;
  color: #312e38;
`

export const InternalLink = styled(Link)`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`

export const ArrowIcon = styled(ArrowLeft)`
  width: 24px;
  height: 24px;
  color: #999591;
`

export const FormWrapper = styled(Form)`
  margin: 80px 0 0;
  width: 340px;
  text-align: center;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 20px;
    text-align: left;
    margin-bottom: 24px;
  }
`
