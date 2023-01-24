const express = require('express')
const cors = require('cors')

const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (request, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body

  const repo = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repo)

  return response.status(200).json(repo)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repo not found.' })
  }

  const repoFind = repositories.find(repo => repo.id === id)

  const { likes } = repoFind

  const repo = {
    id,
    title,
    url,
    techs,
    likes,
  }

  repositories[repoIndex] = repo

  return response.json(repo)
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repo not found.' })
  }

  repositories.splice(repoIndex, 1)

  return response.status(204).send()
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  const repoFind = repositories.find(repo => repo.id === id)

  if (!repoFind) {
    return response.status(400).json({ error: 'Repo not found.' })
  }

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  const { likes, title, url, techs } = repoFind

  const likeUpdate = likes + 1

  const repo = {
    id,
    title,
    url,
    techs,
    likes: likeUpdate,
  }

  repositories[repoIndex] = repo

  return response.status(200).json(repo)
})

module.exports = app
