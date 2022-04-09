import {COMMENT, FETCH_BY_SEARCH,FETCH_ALL, FETCH_POST, CREATE,UPDATE,DELETE, END_LOADING, START_LOADING,} from '../constants/actionTypes'

///this function reutns the posts array so we will have it in our frontend
//function that accept the state,action
export default ( state = { isLoading:true, posts: [] }, action)=>{
  ///switch is good for a lot of if's
  switch (action.type) {
    case FETCH_ALL:
    return{
      ...state,
      posts: action.payload.data,
      currentPage: action.payload.currentPage,
      numberOfPages: action.payload.numberOfPages,
    };
    case CREATE:
    return {...state, posts: [...state.posts, action.payload]};
    case UPDATE:
    //action.payload is the updated post
    //map returns the posts array
    //changing posts in redux state so looping through the posts and updating one that id mayches
    return {...state, posts: state.posts.map((post)=> post._id === action.payload._id ? action.payload : post)};
    case DELETE:
    return {...state, posts: state.posts.filter((post) => post.id !== action.payload)};
    case FETCH_BY_SEARCH:
    return {
      ...state, posts: action.payload
    };
    case START_LOADING:
    return {
      ...state, isLoading: true
    };
    case END_LOADING:
    return {
      ...state, isLoading: false
    };
    case FETCH_POST:
    return {
      ...state, post: action.payload
    };
    case COMMENT:
    return {
      ...state,
      posts: state.posts.map((post) => {
        //changing commented post
        if (post._id === action.payload._id) return action.payload;
        //returning all other posts normally
        return post;
      }),
    };

      break;
    default:
    return state

  }
}
