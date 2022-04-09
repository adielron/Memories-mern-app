import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';


const app = express();
dotenv.config();


//img size
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
//cors need to be above routes
app.use(cors())


//every route inside postRoutes is gonna start  with /posts
app.use('/posts', postRoutes);
app.use('/user', userRoutes);



app.get('/', (req,res) => {
  res.send('Hello Memories Api, the backend is now running')
});

const PORT = process.env.PORT || 5000;

//for errors
mongoose.connect(process.env.CONNECTIO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`)))
.catch((err)=>console.log(err.message));
//for err puprposes
// mongoose.set('useFindAndModify',false);
