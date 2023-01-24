import React, { useCallback, useRef, ChangeEvent } from 'react'

import { FormHandles } from '@unform/core'
import { Mail, Lock, User } from 'styled-icons/feather'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import * as S from './styled'
import { useAuth } from '../../hooks/auth'

interface ProfileFormData {
  name: string
  email: string
  password: string
  old_password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const { user, updateUser } = useAuth()

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files

      if (files) {
        const data = new FormData()
        data.append('avatar', files[0])

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data)
          addToast({
            type: 'sucess',
            title: 'Avatar modificado com sucesso',
          })
        })
      }
    },
    [addToast, updateUser]
  )

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        })

        await schema.validate(data, { abortEarly: false })

        const { name, email, old_password, password, password_confirmation } = data

        const formData = Object.assign(
          {
            name,
            email,
          },
          old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}
        )

        const response = await api.put('/profile', formData)

        updateUser(response.data)

        history.push('/dashboard')

        addToast({
          type: 'sucess',
          title: 'Perfil atualizado!',
          description: 'Os dados do seu perfil foram atualizados.',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        })
      }
    },
    [addToast, history, updateUser]
  )

  return (
    <S.LoginWrapper>
      <S.Header>
        <S.InternalLink to="/dashboard">
          <S.ArrowIcon />
        </S.InternalLink>
      </S.Header>
      <S.Content>
        <S.FormWrapper
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <S.AvatarWrapper>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <S.CameraIcon />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </S.AvatarWrapper>

          <h1>Seu perfil</h1>

          <Input name="name" icon={User} placeholder="Nome" />
          <Input name="email" icon={Mail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={Lock}
            type="password"
            placeholder="Senha atual"
          />
          <Input name="password" icon={Lock} type="password" placeholder="Senha" />
          <Input
            name="password_confirmation"
            icon={Lock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </S.FormWrapper>
      </S.Content>
    </S.LoginWrapper>
  )
}

export default Profile
