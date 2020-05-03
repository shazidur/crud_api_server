const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('we are from posts new page ')
})

router.get('/admin', (req, res) => {
    res.send(' WelCome Campan, you are my Admin ..! ')
})

router.get('/home', (req, res) => {
    res.send(' WelCome to the Home  ..! ' )
})


module.exports = router;