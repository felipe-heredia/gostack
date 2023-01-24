import styled, { css } from 'styled-components'
import { XCircle } from '@styled-icons/feather'
import { animated } from 'react-spring'

interface ToastProps {
  type?: 'sucess' | 'error' | 'info'
  hasdescription: number
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  sucess: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
}

export const Toast = styled(animated.div)<ToastProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  background: #ebf8ff;
  color: #3172b7;

  > svg {
    margin: 4px 12px 0 0;
  }

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`

export const QuitIcon = styled(XCircle)`
  width: 18px;
  height: 18px;
`
