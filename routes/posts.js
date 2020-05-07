const express = require('express');
const router = express.Router();
const Post = require('../models/Post');




// Read all the posts Data : GET Requist 

router.get('/', async ( req, res) => {
  try { 
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.json( { messsage : err})
  }
});


// Submit a Post  - POST Requist  
router.post('/', async (req, res) => {
    console.log('this is the Body part ---- >  ', req.body)
    const post = new Post ({ 
        title : req.body.title,
        description : req.body.description
    });
    try { 
        const savePost = await post.save()
        res.json(savePost)
    } catch(err){
        res.json({ messsage : err })
    }
})

// GET SPESIFIC POST 
router.get('/:postId', async (req, res) => {
    try { 
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (err) {
        res.json({ messsage : err })
    }
})


// Delete Data - Delete Requist 
router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Post.remove( { _id: req.params.postId })
        res.json(removePost)
    } catch(err) {
        res.json({ messsage : err })
    }
    

    // const course = courses.find(c => c.id === parseInt(req.params.id))
    // if (!course) return res.status(404).send(' the course id not fount')

    // // delete 
    // const index = courses.indexOf(course)
    // courses.splice(index, 1)
    // res.send(course)
})


// Update Post  - patch request
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            {_id : req.params.postId}, 
            { $set : { title : req.body.title} }
        )
        res.json(updatePost)
    } catch (err) {
        res.json({ messsage : err})
    }
})


module.exports = router;