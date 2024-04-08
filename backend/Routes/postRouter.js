const express = require("express");
const router = express.Router();
const auth = require("../auth");
const Post = require('../Schemas/PostSchema')
const {createPost, showFeed, showRegionalFeed} = require('../Controller/Posts');
const createPosts = async (req,res) =>{
    const arr = req.body.arr;
    const allPosts = [];
    arr.forEach(async (curr) => {
        try {
            const user = req.user;
            const post = new Post({
                postedState:user.state,
                region : user.region,
                postedBy:user,
                postedByName: user.name,
                url:curr.url,
                content:curr.content,
                filters:curr.filters,
                tags:curr.tags
            })
            await post.save();
            req.user.posts = req.user.posts.concat(post._id);
            allPosts.push(post);
        }catch(e){
            res.status(400).send({message:"Couldn't create post"});
            throw new Error(e);
        }
    });
    res.send(allPosts)
}

router.post('/create',auth, createPost);
router.get('/showRegionalFeed', auth, showRegionalFeed)
router.get('/showFeed/:page',auth,showFeed);
router.post('/createPosts',auth,createPosts)


module.exports = router;
