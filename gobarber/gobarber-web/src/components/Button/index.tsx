import React, { ButtonHTMLAttributes } from 'react'

import * as S from './styled'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: number
}

const Button: React.FC<ButtonProps> = props => (
  <S.ButtonWrapper type="button" {...props}>
    {props.loading ? 'Carregando...' : props.children}
  </S.ButtonWrapper>
)

export default Button
