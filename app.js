const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('dotenv/config')

//Import router
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)


//Middleware
app.use('/posts', () => {
    console.log('this the middleware, and it is working')
})


// Routes 
app.get('/', (req, res) => {
    res.send('we are from the Node Home')
})

// app.get('/posts', (req, res) => {
//     res.send(' this is from the posts :)')
// })



//Connect DB
mongoose.connect( 
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    
    () => console.log(' connect to the DB nice man .. great!  Cool')
)



// lesting to the server
app.listen(3000);