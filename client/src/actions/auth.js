import {AUTH} from '../constants/actionTypes';
import * as api from '../api';

//redux flow #2 dispaching this whole action

//action creator function that returns an action
//thats is why we use redux thunk
export const signIn = (formData, navigate) => async (dispath) => {
  try {
    //trying to send data to db in backend
    //login in that user

//destructuring and calling the function
// call to api #3
//basiclly we are sending a post req and waiting for the backend te respond
//with the data
    const { data } = await api.signIn(formData);

  //#5
    dispath({type:AUTH, data})

    navigate('/')
  } catch (err) {
    console.log(err);
  }
}


export const signUp = (formData, navigate) => async (dispath) => {
  try {
    const { data } = await api.signUp(formData);
  //#5
    dispath({type:AUTH, data})

    navigate('/')
  } catch (err) {
    console.log(err);

  }
}
