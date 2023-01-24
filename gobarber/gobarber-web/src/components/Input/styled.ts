import styled, { css } from 'styled-components'
import { AlertCircle } from 'styled-icons/feather'

import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isField: boolean
  isErrored: boolean
}

export const InputWrapper = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666368;

  ${props => props.isErrored && css`
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    color: #ff9000;
    border-color: #ff9000;
  `}

  ${props => props.isField && css`
    color: #ff9000;
  `}

  display: flex;
  align-items: center;

  svg {
    margin-right: 16px;
  }

  & + div {
    margin-top: 8px;
  }
`

export const Content = styled.input`
  flex: 1;
  background: transparent;
  border: 0;
  color: #faede8;

  &::placeholder {
    color: #666360;
  }
`

export const ErrorWrapper = styled(Tooltip)`
height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`

export const ErrorIcon = styled(AlertCircle)`
  width: 20px;
  height: 20px;

  color: #c53030;
`
