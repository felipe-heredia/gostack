import React, { useRef, useCallback, useState } from 'react'
import { Mail } from 'styled-icons/feather'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'

import { useToast } from '../../hooks/toast'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import * as S from './styled'
import api from '../../services/api'

interface ForgotPasswordFormData {
  email: string
  password: string
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        })

        await schema.validate(data, { abortEarly: false })

        await api.post('/password/forgot', {
          email: data.email,
        })

        addToast({
          type: 'sucess',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao realizar a recuperação de senha, tente novamente.',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast]
  )

  return (
    <S.LoginWrapper>
      <S.Content>
        <img src={logoImg} alt="GoBarber" />

        <S.FormWrapper ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>

          <Input name="email" icon={Mail} placeholder="E-mail" />

          <Button loading={Number(loading)} type="submit">
            Recuperar
          </Button>
        </S.FormWrapper>

        <S.InternalLink to="/">
          <S.LoginIcon />
          Voltar para Login
        </S.InternalLink>
      </S.Content>
    </S.LoginWrapper>
  )
}

export default ForgotPassword
