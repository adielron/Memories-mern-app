import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


//finding & creating an obj takes time so we have to write async function and await on the const
export const getPosts = async (req,res)=> {
  const { page } = req.query;
  try {

    const LIMIT = 8;
    console.log('this is the page ' + page);
    const startIndex = (Number(page)-1)*LIMIT; //get the starting index of every page
    console.log("this is the start index "+startIndex);
    const total = await PostMessage.countDocuments({});
    console.log('getting posts...');
    const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
  } catch (err) {
    res.status(404).json({message:err.message});
  }
}

//QUERY -> /posts?page=1 -> page=1
//PARAMS -> /posts/123 -> id =123 * get specific resource


export const getPostsBySearch = async (req,res)=> {
  const { searchQuery, tags } = req.query
  console.log('this is the tags');
  console.log(tags);
  try {
    // regexp allows to search through text the second parameter is exp flags
    const title =new RegExp(searchQuery, 'i'); // test Test TEST -> test
    //find me title or tags
    //title
    //tags- is one of the tags in the tags array  === to our tags
    console.log('this is the title search');
    console.log(title);
    console.log('getting posts by searchQuery...');
    const posts = await PostMessage.find({ $or: [ {title}, {tags: { $in: tags.split(',') } } ] });
    res.status(200).json({data: posts});
  } catch (err) {
    res.status(404).json({message:err.message});
  }
}




export const createPost = async (req,res)=>{
  console.log('creating post');
  const post = req.body;
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

try {
  await newPost.save();
  console.log('saved');

  res.status(201).json(newPost);
} catch (err) {
  res.status(409).json({message: err.message});

}
}

//destructure and rename property
export const updatePost = async(req,res) =>{
  console.log('updating something');
  const {id:_id} = req.params;
  const post = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id")
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true})
  console.log('finished');
  res.json(updatedPost)
}

export const deletePost = async (req,res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id")
  await PostMessage.findByIdAndRemove(id);
  console.log('deleted');
  res.json({message:'post deleted successfully'})
}


export const likePost  = async (req,res)=>{
  const {id} = req.params;

  if(!req.userId) return res.json({message:'unauthenticated'})

  console.log('someone is trying to like a post');
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id")
  console.log('updating...');
  const post = await PostMessage.findById(id);
  // looping through each like "id"
  //findIndex() returns the index of the first element that passes a test (provided by a function).
  const index = post.likes.findIndex((id)=> id === String(req.userId));
  // only if id is not in the loop its = -1
  if(index === -1){
    //like- we add the id of the user
    post.likes.push(req.userId)
  }else{
    //dislike we remove the id of the user
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new:true});
  console.log('finished like');
  res.json(updatedPost)

}


export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message});
  }
}



export const commentPost = async (req,res) => {
  const { id } = req.params;
  const { value } = req.body;

  console.log('user is commenting...');
  const post = await PostMessage.findById(id);
  post.comments.push(value);
  const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
  console.log('updated comment in backend');
  res.json(updatedPost);
}
