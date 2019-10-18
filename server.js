const express = require('express')
const bodyParser = require('body-parser')
const knex = require('knex')

// Defining the database constant "db"
const db = knex({
    client: 'pg',
    connection: {
      connectionString : 'process.env.DATABASE_URL', // Heroku
      ssl: true,
    //   user : 'postgres',
    //   password : 'postgres',
    //   database : 'business-directory'
    }
  });

console.log(db.select('*').from('country').then(data => {
    console.log(data)
}))
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('it is working')
})

// app.post('/signin', (req, res) => {
//     if (req.body.email === database.users[0].email &&
//         req.body.password === database.users[0].password) {
//       res.json('Success!')
//     } else {
//       res.status(400).json('error logging in')
//     }
//     // res.json('Sign in')
// })

// The code below is used to register a user to the "users" table
app.post('/register', (req, res) => {
    const {email, name, password} = req.body
    db('users').returning('*').insert({
        email: email,
        name: name,
        joined: new Date()
    })
    .then(user => { // you can also use 'response' instead of 'user'
        res.json(user[0]) // here too - delete the '[0]'
    })
    .catch(err => res.status(400).json(err))
})

// Add a country to the "country" table
app.post('/country', (req, res) => {
    const {country} = req.body
    db('country').returning('*').insert({
        country: country
    })
    .then(user => { // you can also use 'response' instead of 'user'
        res.json(user[0]) // here too - delete the '[0]'
    })
    .catch(err => res.status(400).json(err))
})


// Add a product to the "product" table
app.post('/product', (req, res) => {
    const {product} = req.body
    db('product').returning('*').insert({
        product: product
    })
    .then(user => { // you can also use 'response' instead of 'user'
        res.json(user[0]) // here too - delete the '[0]'
    })
    .catch(err => res.status(400).json(err))
})

// Add a country to the "information" table
app.post('/information', (req, res) => {
    const {best_country} = req.body
    db('information').returning('*').insert({
        best_country: best_country
    })
    .then(user => { // you can also use 'response' instead of 'user'
        res.json(user[0]) // here too - delete the '[0]'
    })
    .catch(err => res.status(400).json(err))
})

// Sends a user id from the users table
app.get('/profile/:id', (req, res) => {
    const {id} = req.params
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        
    })
    .catch(err => res.status(400).json('error getting user'))
})

// to increment entries column
app.put('/image', (req, res) => {
    const {id} = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1) 
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    }) 
    .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})