import jwt from "jsonwebtoken";

//user wants to like a post
//click the like button => auth middleware (confirms or denies this request);
// next => ok you are allowed to like the post => call the like controller

const auth = async (req, res, next) => {
  try {
    //check if the user's token is valid when the user wants to delete, like or update a post
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test"); //gives us the data from each specific token (email, id)

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; //sub is the google id that differentiate every user
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
