const express = require('express')
const app = express()
const fs = require('mz/fs')

const bodyParser = require('body-parser')
app.use(bodyParser.text())
// app.use(bodyParser.urlencoded())

let env = {
  'savedDirectory': './file/',
  'secret': 'FYV^*OUIP878iu&T^UJKN@#$ERT'
}

/****************
 * user
 ****************/

let User = function (id, name, password) {
  this.id = id
  this.name = name
  this.password = password
}

let db = {}
db.Users = []

// app.post('/user/signUp', (req, res) => {
//  // Denial same login method?
//  db.Users.push(new User(req.body.id, req.body.name, req.body.password))
// })
//
// app.get('/user/login', (req, res) => {
//  // Err: wrong password
//  //
//
// })
//
// app.get('/user/aboutMe', (req, res) => {
//  req.query.token
//  // Err: token overdate
// })

/****************
 * file
 ****************/

app.post('/file/:name', async (req, res) => {
  try {
    let fd = await fs.open(env.savedDirectory + req.params.name, 'w')
    await fs.write(fd, Buffer.from(req.body))
    await fs.close(fd)
    res.send('success')
  } catch (e) {
    console.log('HTTP 500')
    res.status(500).end()
  }
})

app.get('/file/:name', async (req, res) => {
  try {
    if (fs.access(env.savedDirectory + req.params.name,
    fs.constants.R_OK)) {
      let fd = await fs.open(env.savedDirectory + req.params.name, 'r')
      let content = await fs.readFile(fd)
      res.type('text/plain')
      res.send(content)
    } else {
      res.status(404).end()
    }
  } catch (e) {
    console.log('HTTP 500')
    res.status(500).end()
  }
})

app.listen(3000)
console.log('listening on 3000')
