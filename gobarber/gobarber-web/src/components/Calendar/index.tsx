import React from 'react'
import 'react-day-picker/lib/style.css'

import * as S from './styled'

const Calendar: React.FC = ({ children }) => {
  return <S.CalendarWrapper>{children}</S.CalendarWrapper>
}

export default Calendar
