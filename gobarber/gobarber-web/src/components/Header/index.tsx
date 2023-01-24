import React from 'react'

import logoImg from '../../assets/logo.svg'

import { User, useAuth } from '../../hooks/auth'

import * as S from './styled'

interface HeaderProps {
  user: User
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { signOut } = useAuth()

  return (
    <S.Header>
      <S.HeaderContent>
        <img src={logoImg} alt="GoBarber" />

        <S.InternalLink to="/profile">
          <S.Profile>
            {user.avatar_url && <img src={user.avatar_url} alt={user.name} />}

            <S.WelcomeWrapper>
              <S.WelcomeTitle>Bem-vindo,</S.WelcomeTitle>
              <S.WelcomeUser>{user.name}</S.WelcomeUser>
            </S.WelcomeWrapper>
          </S.Profile>
        </S.InternalLink>

        <button type="button" onClick={signOut}>
          <S.LogoutIcon />
        </button>
      </S.HeaderContent>
    </S.Header>
  )
}

export default Header
