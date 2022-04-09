//hash password
import bcrypt from 'bcryptjs';
// jwt-store user in browsre for some time safetly (staying logged in)
import jwt from 'jsonwebtoken';

import User from '../models/user.js';




export const signin = async (req, res) => {
  const { email, password }  = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({message:'user does not exist'})
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if(!isPasswordCorrect) return res.status(400).json({message:'invaild credentials'})
    //create token
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', {expiresIn:'1h'});

    res.status(200).json({result: existingUser, token})
  } catch (err) {
    res.status(500).json({message:'something went wrong'});
  }
}

export const signup = async (req, res) => {
  const {email, password, firstName, lastName, confirmPassword} = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(404).json({message:'user already exist'});

    if(password !== confirmPassword) return  res.status(404).json({message:'passswords do not match'});
    const hashedPassword = await bcrypt.hash(password, 12)

//The .save() is an instance method of the model,
// while the .create() is called directly from the Model as a method call,
//being static in nature, and takes the object as a first parameter.
    const result = await User.create({ email, password:hashedPassword, name:`${firstName} ${lastName}`});
    console.log('sign up created user in db');
    console.log(result);
    const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn:'1h'});
    res.status(200).json({result, token})

  } catch (err) {
    res.status(500).json({message:'something went wrong'});

  }
}
