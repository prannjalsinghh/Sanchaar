const Post = require('../Schemas/PostSchema');

const createPost = async (req, res) =>{
    try {
        const user = req.user;
        const post = new Post({
            postedState:user.state,
            region : user.region,
            postedBy:user,
            postedByName: user.name,
            url:req.body.url,
            content:req.body.content,
            filters:req.body.filters,
            tags:req.body.tags
        })
        await post.save();
        req.user.posts = req.user.posts.concat(post._id);
        res.status(201).send(post);
    }catch(e){
        res.status(400).send({message:"Couldn't create post"});
        throw new Error(e);
    }
}

const showFeed = async (req, res) =>{
    var perPage = 10, page = Math.max(0, req.params.page);
    try{
        Post.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec(function(err, posts) {
            res.status(201).send(posts);
        })
    }catch(e){
        res.status(400).send({message:"Couldn't get posts"});
        throw new Error(e);
    }

}

const showRegionalFeed = (req, res) =>{

    try{
        const user = req.user;

        Post.find({region : user.region})
        .exec(function(err, posts) {
            res.status(201).send(posts);
        })
    }catch(e){
        res.status(400).send({message:"Couldn't get posts"});
        throw new Error(e);
    }
}

module.exports = {createPost, showFeed, showRegionalFeed};