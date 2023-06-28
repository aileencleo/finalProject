import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    } else {
      throw new Error("Password is incorrect"); // Throw an error for incorrect password
    }
  } else {
    throw new Error("Could not find user with email: " + email); // Throw an error for email not found
  }
};

const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}


export {
  getUserByEmailIdAndPassword,
  getUserById,
};