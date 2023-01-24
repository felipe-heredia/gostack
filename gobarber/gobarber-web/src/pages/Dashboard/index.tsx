import React, { useCallback, useState, useEffect, useMemo } from 'react'
import DayPicker, { DayModifiers } from 'react-day-picker'
import { isToday, format, parseISO, isAfter } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useAuth } from '../../hooks/auth'
import Header from '../../components/Header'
import Calendar from '../../components/Calendar'

import * as S from './styled'
import api from '../../services/api'

interface MonthAvailabilityItem {
  day: number
  available: boolean
}

interface Appointment {
  id: string
  date: string
  hourFormatted: string
  user: {
    name: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data)
      })
  }, [currentMonth, user.id])

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, monthDay.day)
      })

    return dates
  }, [currentMonth, monthAvailability])

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    })
  }, [selectedDate])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR })
  }, [selectedDate])

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          }
        })

        setAppointments(appointmentsFormatted)
      })
  }, [selectedDate])

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12
    })
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12
    })
  }, [appointments])

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date())
    )
  }, [appointments])

  return (
    <S.DashboardWrapper>
      <Header user={user} />

      <S.Content>
        <S.Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <S.NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <S.ClockIcon />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </S.NextAppointment>
          )}

          <S.Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && <p>Nenhum agendamento neste período.</p>}

            {morningAppointments.map(appointment => (
              <S.Appointment key={appointment.id}>
                <span>
                  <S.ClockIcon />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />

                  <strong>{appointment.user.name}</strong>
                </div>
              </S.Appointment>
            ))}
          </S.Section>

          <S.Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}

            {afternoonAppointments.map(appointment => (
              <S.Appointment key={appointment.id}>
                <span>
                  <S.ClockIcon />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />

                  <strong>{appointment.user.name}</strong>
                </div>
              </S.Appointment>
            ))}
          </S.Section>
        </S.Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março ',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </S.Content>
    </S.DashboardWrapper>
  )
}

export default Dashboard
