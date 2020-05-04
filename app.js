const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const Joi = require('joi')

const app = express()
require('dotenv/config')



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const courses = [
    { id: 1, name : 'Node JS'},
    { id: 2, name : 'javaScript'},
    { id: 3, name : 'math'}
]

function validateCourse(val) {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(val, schema)
}


//  GET Request ~~~~~~~~~~~~~~~~~~~~~~~
app.get('/', (req, res) => {
    res.send('  Hello world ok....')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send(' The course with the given ID was not found !')
    res.send(course.name);
})


//  POST Request ~~~~~~~~~~~~~~~~~~~~~~~
app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message)


    const course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course)
})

// Update (PUT) Request ~~~~~~~~~~~~~~~~~~~~~~~
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send(' the course id not fount')

    const {error} = validateCourse(req.body)   // using object distructuring 
    if (error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name
    res.send(course)

    
    // ----- algorithom ---------
    // Look uo the courses 
    // if not exist, return 404

    //validate 
    //if invalide, return 400

    //Update course
    // return the update course 
})


// Delete Request ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.delete('/api/courses/:id', (req, res) => {
    console.log(' Delete -- ')
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send(' the course id not fount')

    // delete 
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})


// //Import router
// const postsRoute = require('./routes/posts')
// app.use('/posts', postsRoute)


// //Middleware
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(cookieParser());


// // Routes 
// app.get('/', (req, res) => {
//     res.send('we are from the Node Home')
// })


// //Connect DB
// mongoose.connect( 
//     process.env.DB_CONNECTION,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => console.log(' Db Connect....')
// )


// lestening to the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing on port ${port}....`));