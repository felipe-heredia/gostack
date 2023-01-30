import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

import api from '../../services/api'

import logoImage from '../../assets/logo.svg'

import * as S from './styled'

interface RepositoryParams {
  repository: string
}

interface Repository {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface Issue {
  title: string
  id: number
  html_url: string
  user: {
    login: string
  }
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>()
  const [issues, setIssues] = useState<Issue[]>([])

  const { params } = useRouteMatch<RepositoryParams>()

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then(response => {
      setRepository(response.data)
    })

    api.get(`/repos/${params.repository}/issues`).then(response => {
      setIssues(response.data)
    })
  }, [params.repository])

  return (
    <S.RepositoryWrapper>
      <S.Header>
        <img src={logoImage} alt="Github explorer" />
        <S.ReturnLink to="/">
          <S.ArrowLeft />
        Voltar
        </S.ReturnLink>
      </S.Header>

      {repository && (
        <S.RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Starts</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </S.RepositoryInfo>
      )}

      <S.Issues>
        {issues.map(issue => (
          <S.IssueLink key={issue.id} href={issue.html_url} >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <S.ArrowRight />
          </S.IssueLink>
        ))}
      </S.Issues>
    </S.RepositoryWrapper>
  )
}

export default Repository
