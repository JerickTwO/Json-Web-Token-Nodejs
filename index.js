import express from 'express' // para usar esto debes en package.json poner type=module
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello Midu Node js</h1>')
})

app.post('/login', (req, res) => {})

// END-POINTS
app.post('/register', (req, res) => {
  const { username, password } = req.body
  console.log(req.body)
  try {
    const id = UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    // NORMALMENTE NO ES BUENA IDEA MANDAR EL ERROR DEL REPOSITORIO
    res.status(400).send(error.message)
  }
})

app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)
