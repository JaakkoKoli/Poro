const porosRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Poro = require('../components/database')
const User = require('../components/database')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

porosRouter.get('/', async (request, response) => {
  const poros = await Poro
    .find({})
    .populate('type')
    .populate('owner')

  response.json(poros.map(Poro.format))
})

porosRouter.get('/:id', async (request, response) => {
  try {
    const poro = await Poro
    .findById(request.params.id)
    .populate('type')
    .populate('owner')

    if (poro) {
      response.json(Poro.format(poro))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

porosRouter.delete('/:id', async (request, response) => {
  try {
    await Poro.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

porosRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.name === undefined || body.type === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const user = await User.findById(decodedToken.id)

    const poro = new Poro({
        name: body.name,
        type: body.type,
        owner: user.id,
        date: Date(),
        experience: body.experience||0,
        level: body.level||0,
        healthIV: body.healthIV||0,
        attackIV: body.attackIV||0,
        defenseIV: body.defenseIV||0,
    })

    const savedPoro = await poro.save()

    user.poros = user.poros.concat(savedPoro._id)
    await user.save()

    response.json(Note.format(note))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

porosRouter.put('/:id', (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note
    .findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(Note.format(updatedNote))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = porosRouter