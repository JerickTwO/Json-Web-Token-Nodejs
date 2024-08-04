import express from 'express' // para usar esto debes en package.json poner type=module
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    res.send({ user })
  } catch (error) {
    res.status(401).send(error.message)
  }
})

// END-POINTS
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log(req.body)
  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    // NORMALMENTE NO ES BUENA IDEA MANDAR EL ERROR DEL REPOSITORIO
    res.status(400).send(error.message)
  }
})

app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {
  res.render('protected')
})

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)
