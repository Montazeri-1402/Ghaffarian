//packeges
const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const debug = require('debug')('app:main')
const dbdebug = require('debug')('app:Database')
const userApiRouter = require('./routes/users')
const homeRoute = require('./routes/home')

//MiddleWares
app.use(express.json())
app.use(helmet())
app.use('/api/users', userApiRouter)
app.use('/', homeRoute)
//View Engine
app.set('view engine', 'ejs')
app.set('views', './Views')

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  debug('Envirment is on Develop')
}
app.use(express.static('Public'))
app.use(express.urlencoded({ extended: true }))

//check the config
debug('name of app: ', config.get('name'))
debug('Version of app: ', config.get('version'))
debug('SMS ip of app: ', config.get('SMS.ip'))
debug('SMS key of app: ', config.get('SMS.key'))

// when the app reach the point that your routhandler match to request, it will be doing hes job and finish the work ,so if you add middlerware after routhandeler it may not go to the next middleware
//API ,every API's and Routs that  you make is a Middleware
//Get API's

//PORT and Listening to the port!
const port = process.env.PORT || 3000
app.listen(port, () => {
  debug(`app is Running on port  ${port}`)
})
