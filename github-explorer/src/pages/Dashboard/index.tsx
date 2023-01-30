// eslint-disable-next-line no-unused-vars
import React, { useState, FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImage from '../../assets/logo.svg'
import api from '../../services/api'

import * as S from './styled'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newRepo) {
      return setInputError('Digite autor/nome do repositório')
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`)

      const repository = response.data

      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (err) {
      setInputError('Erro na busca por esse repositório')
    }
  }

  return (
    <>
      <img src={logoImage} alt="Github explorer" />
      <S.Title>Explore repositórios no Github</S.Title>

      <S.Form hasError={!!inputError} onSubmit={handleAddRepository} >
        <input value={newRepo} onChange={(e) => setNewRepo(e.target.value)} placeholder="Digite o nome do repositório" />
        <button>Pesquisar</button>
      </S.Form>

      {inputError && <S.Error>{inputError}</S.Error>}

      <S.Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <S.Arrow />
          </Link>
        ))}
      </S.Repositories>
    </>
  )
}

export default Dashboard
