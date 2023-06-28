import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById } from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

declare global {
  namespace Express{
    interface User{
      id: number
    }
  }
}

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  //function that talks in the database 
  (email, password, done) => {
    try {
      //checks if the user exist in the database using the getUser.. from the userController
      const user = getUserByEmailIdAndPassword(email, password);
      return done(null, user);
    } catch (error) {
      return done(null, false, {
        message: (error as Error).message,
      });
    }
  }
);


/*
FIX ME (types)
*/
passport.serializeUser(function (user: Express.User, done: (err: any, id?: Number) => void) {
  done(null, user.id);
});

/*
FIX ME (types)
*/
passport.deserializeUser(function (id: Number, done: (err: any, user?: false | Express.User | null | undefined) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
