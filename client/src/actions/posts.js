import {COMMENT, FETCH_POST, FETCH_BY_SEARCH, END_LOADING, START_LOADING, FETCH_ALL,CREATE,UPDATE,DELETE} from '../constants/actionTypes';
import * as api from '../api';

// we import  it this way beacuse we will have alot of calls from api

//the problem is we are working with asymchromous data
// to fetch all the posts time is going to have to pass
// for that we have to use redux thunk
//it allows us to specify an additional arrow function



//action creators-function that returns an -
//action(that has the type and payload)
export const getPosts = (page) => async (dispatch) => {
try {
  //trying to get all the data from api by destructuring
  //fetching from our dataBase in backend
  dispatch({ type: START_LOADING });
  const { data } = await api.fetchPosts(page);


  dispatch({type: FETCH_ALL, payload: data});
  dispatch({ type: END_LOADING });

} catch (err) {
  console.log(err);
}
};

// we created a function that returns another function (action)


export const createPost = (post, navigate) => async (dispatch) => {
try {
  //the response
  dispatch({ type: START_LOADING });
  const { data } = await api.createPost(post);
  dispatch({type: CREATE, payload: data});
  dispatch({ type: END_LOADING });
  navigate(`/posts/${data._id}`)

} catch (err) {
  console.log(err);
}
}

export const updatePost = (id, post) => async (dispatch) =>{
  try {
    //returns updated post
    const {data} = await api.updatePost(id, post);
    dispatch({type:UPDATE, payload:data })
  } catch (err) {
    console.log(err);
  }
}

export const deletePost = (id) => async (dispatch)=>{
  try {
    await api.deletePost(id);
    dispatch({type:DELETE, payload:id})
  } catch (err) {
    console.log(err);
  }
}


export const likePost = (id) => async(dispatch)=>{
  try {
    const {data} = await api.likePost(id);
    dispatch({type:UPDATE, payload:data })
  } catch (err) {
    console.log(err);
  }
}



export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    console.log('SEARCH QUERY ACTIVATED');
    dispatch({ type: START_LOADING });
    const {data: { data } } = await api.fetchPostsBySearch(searchQuery);
    dispatch({type: FETCH_BY_SEARCH, payload: data});
    dispatch({ type: END_LOADING });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}



export const getPost = (id) => async (dispatch) => {
try {
  //trying to get all the data from api by destructuring
  //fetching from our dataBase in backend
  dispatch({ type: START_LOADING });
  const { data } = await api.fetchPost(id);


  dispatch({type: FETCH_POST, payload: data});
  dispatch({ type: END_LOADING });

} catch (err) {
  console.log(err);
}
};




export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value,id);


    dispatch({ type: COMMENT, payload: data });


    return data.comments;
  } catch (err) {
    console.log(err);
  }
}
