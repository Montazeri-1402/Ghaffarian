const express = require('express')
let users = require('../users.js')
const fs = require('node:fs')
const { stringify } = require('node:querystring')
const { body, validationResult } = require('express-validator')
//Router express
const router = express.Router()
router.get('/', (req, res) => {
  res.json({ data: users, massage: 'success-OK' })
})
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id == req.params.id)
  if (!user)
    return res
      .status(404)
      .json({ data: null, massage: 'The user is not Exist!' })
  if (user) return res.json({ data: user, massage: 'Success-OK ' })
})

//POST API's
router.post(
  '/',
  [
    body('email', 'Please Enter Valid Email').isEmail(),
    body('first_name', 'Please Enter FirstName').notEmpty(),
    body('email', 'Please Enter LastName').notEmpty(),
  ],
  (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      res
        .status(404)
        .json({ data: null, erros: erros.array(), massage: 'validation Error' })
    }
    let userslocal = users
    userslocal.push({ id: userslocal.length + 1, ...req.body })
    fs.writeFile('Data.js', JSON.stringify(userslocal), (e) => {
      if (e) return console.log(e)
    })
    res.json({ data: userslocal, massage: 'Ok!' })
  },
)
//PUT API's
router.put(
  '/:id',
  [
    body('email', 'Please Enter Valid Email').isEmail(),
    body('first_name', 'Please Enter FirstName').notEmpty(),
    body('email', 'Please Enter LastName').notEmpty(),
  ],
  (req, res) => {
    const user = users.find((u) => u.id == req.params.id)
    if (!user)
      return res.status(404).json({
        data: null,
        massage: 'The user with given id, does  not Exist',
      })
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      res
        .status(404)
        .json({ data: null, erros: erros.array(), massage: 'validation Error' })
    }

    users = users.map((user) => {
      if (user.id == req.params.id) {
        return { ...user, ...req.body }
      }
      return user
    })

    res.json({ data: users, massage: 'Ok!' })
  },
)
//DELETE API's
router.delete('/:id', (req, res) => {
  const user = users.find((u) => u.id == req.params.id)
  if (!user)
    return res
      .status(404)
      .json({ data: null, massage: 'The user with given id, does  not Exist' })
  const index = users.indexOf(user)
  console.log(index)
  users.splice(index, 1)
  res.json({ data: users, massage: 'Ok!' })
})
/*router.get('/', (req, res) => {
    res.send([
      {
        userid: 1,
        name: 'ali',
      },
      {
        userid: 2,
        name: 'jafar',
      },
      { userid: 3, name: 'kosar' },
    ])
  })
  app.get('/api/users/:id:name', (req, res) => {
    res.send({ userid: req.params.id, name: req.params.name })
  })
  */
module.exports = router
