import jwt from 'jsonwebtoken';



// user wants to like a posts
// clicks the like => auth middleware(next) => like controller


//next mean after the function do 'next'
const auth = async (req, res, next) => {
  try {
    //cheking if user token is valid
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth){
      //this gives us data from token
      decodedData = jwt.verify(token, 'test')
      req.userId = decodedData?.id
    } else {
      //google oauth token
      decodedData = jwt.decode(token);

      console.log(decodedData);
      //sub is googles word for id
      req.userId = decodedData?.sub;
    }
    next();

  } catch (err) {
    console.log(err);
  }
}

export default auth;
