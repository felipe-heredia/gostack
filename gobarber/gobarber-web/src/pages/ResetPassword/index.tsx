import React, { useRef, useCallback } from 'react'
import { Lock } from 'styled-icons/feather'
import { FormHandles } from '@unform/core'
import { useHistory, useLocation } from 'react-router-dom'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'

import { useToast } from '../../hooks/toast'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import * as S from './styled'

interface ResetPasswordFormData {
  email: string
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const history = useHistory()
  const location = useLocation()

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'A senha precisa ter 6 caractéres'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas não são iguais.'
          ),
        })

        await schema.validate(data, { abortEarly: false })

        const { password, password_confirmation } = data
        const token = location.search.replace('?token=', '')

        if (!token) {
          throw new Error()
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        })

        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro ao mudar senha',
          description: 'Ocorreu um erro ao modificar sua senha, tente novamente.',
        })
      }
    },
    [addToast, history, location]
  )

  return (
    <S.LoginWrapper>
      <S.Content>
        <img src={logoImg} alt="GoBarber" />

        <S.FormWrapper ref={formRef} onSubmit={handleSubmit}>
          <h1>Modificar Senha</h1>

          <Input name="password" icon={Lock} type="password" placeholder="Nova senha" />
          <Input
            name="password_confirmation"
            icon={Lock}
            type="password"
            placeholder="Confirme a senha"
          />

          <Button type="submit">Modificar senha</Button>
        </S.FormWrapper>
      </S.Content>
    </S.LoginWrapper>
  )
}

export default ResetPassword
