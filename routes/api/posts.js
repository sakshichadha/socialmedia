const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator/check');
const auth=require('../../middleware/auth');
const Post=require('../../models/Post');
const Profile=require('../../models/Profile');
const User=require('../../models/User');
//private create a post
router.post('/',auth,async(req,res)=>
{
//const errors=validationResult(req);
// if(!errors.isEmpty())
// {
//     return res.status(400).json({errors:erros.array()});
// }
try {
    const user=await User.findById(req.user.id).select('-password');
    console.log("IN API ADD POST")
    //console.log(req.body.text);
    const newPost=new Post({
        text:req.body.text,
        name:user.name,
        user:req.user.id
    });
    const post=await newPost.save();
    res.json(newPost);
} catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
}


});
//get api/posts get all posts  private
router.get('/',auth,async(req,res)=>
{
try{
    //sort using date and -1 means most recent one first
const posts=await Post.find().sort({date:-1});
res.json(posts);
}
catch(err)
{
  console.error(err.message);
  res.status(500).send('Server error');  
}

});
//get api/posts/:findById get post by id
router.get('/:id',auth,async(req,res)=>
{
try{
    //sort using date and -1 means most recent one first
const post=await Post.findById(req.params.id);
if(!post)
{
    return res.status(404).json({msg:'post not found'});
}
res.json(post);
}
catch(err)
{
  console.error(err.message);
  if(err.kind=='ObjectId')
{
return res.status(404).json({msg:'post not found'});
}
  res.status(500).send('Server error');  
}

});
router.delete('/:id',auth,async(req,res)=>
{
try{
    
const post=await Post.findById(req.params.id);
if(!post)
return res.status(404).json({msg:'post not found'});

//check if user owns the posts
if(post.user.toString()!==req.user.id)
{
return res.status(401).json({msg:'User not authorized'});
}
await post.remove();
res.json({msg:'Post removed'});
}
catch(err)
{
  console.error(err.message);
  if(err.kind=='ObjectId')
{
return res.status(404).json({msg:'post not found'});
}
  res.status(500).send('Server error');  
}

});
//like  route put api/posts/like/:id
router.put('/like/:id',auth,async(req,res)=>
{ console.log("INSIDE ROUTE LIKE");
try {
    const post=await Post.findById(req.params.id);
    console.log("After")
    //check if already liked
    if(post.likes.filter(like=>like.user.toString()==req.user.id).length>0)
    {
return res.status(400).json({msg:'Post already liked'});
    }
    //unshift adds in the beginning
    post.likes.unshift({user:req.user.id});
    console.log("done")
    await post.save();
    res.json(post.likes);

} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');  
}
});
//post unlike
router.put('/unlike/:id',auth,async(req,res)=>
{
try {
    const post=await Post.findById(req.paramas.id);
    //check if already liked
    if(post.likes.filter(like=>like.user.toString()==req.user.id).length==0)
    {
return res.status(400).json({msg:'Post already not liked'});
    }
    //get remove index
    const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex,1);
   
    await post.save();
    res.json(post.likes);

} catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');  
}
});
//comment
router.post('/comment/:id',auth,async(req,res)=>
{ console.log("INSIDE ADD COMMENT ROUTE")
// const errors=validationResult(req);
// if(!errors.isEmpty())
// {
//     return res.status(400).json({errors:erros.array()});
// }
try {
    const user=await User.findById(req.user.id).select('-password');
    const post=await Post.findById(req.params.id);
  const newComment={
      text:req.body.text,
      name:user.name,
      user:req.user.id
    };
    post.comments.unshift(newComment);
    console.log("DONE");

     await post.save();
     console.log(post.comments);
    res.json(post.comments);
} catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
}


});


module.exports=router;