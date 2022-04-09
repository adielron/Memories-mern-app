import axios from 'axios';


// const API = axios.create({ baseUrl: 'http://localhost:5000'});
// const API = axios.create({ baseUrl: 'https://social-memories-app-1.herokuapp.com'});
const API = axios.create({ baseUrl: 'https://memories-app-vtwo.herokuapp.com/'});


//
//apending token to every req
API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')) {
    //outting in req.headers the token
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});


//backend route
// const url= 'http://localhost:5000/posts'
// const url = "https://memories-react-app-fullstack.herokuapp.com/posts"
//#4 req
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post('/posts', newPost)
//send a patch req
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`,updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${ searchQuery.search || 'none'}&tags=${searchQuery.tags}`);



export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value});
