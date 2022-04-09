import {AUTH, LOGOUT} from '../constants/actionTypes'



//#6

// if we dont have anything uor state is null
//we get the dipatch and now we want to save it in local storage
const authReducer = (state={authData:null}, action) => {
  switch (action.type) {
    case AUTH:
    //localStorage is a property that allows JavaScript sites and apps to
    // save key-value pairs in a web browser with no expiration date.
    //sending data to brwoser storage
    localStorage.setItem('profile', JSON.stringify({...action?.data}))
      return { ...state, authData: action?.data};
      case LOGOUT:
      //clear browsing storage
      localStorage.clear()
      return {...state, authData:null};
      break;
    default:
      return state;

  }
}

export default authReducer;
