import React from 'react'

import * as S from './styled'

interface TooltipProps {
  title: string
  className?: string
}

const Tooltip: React.FC<TooltipProps> = ({ title, children, className }) => (
  <S.TooltipWrapper className={className} >
    {children}
    <span>{title}</span>
  </S.TooltipWrapper>
)

export default Tooltip
