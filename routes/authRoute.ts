import * as express from "express";
import * as passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";
import { Request, Response} from 'express';

const router = express.Router();

declare module 'express-session' {
  interface SessionData {
    messages?: string[];
  }
}

//github login
router.get('/github',
  passport.authenticate('github', { 
    scope: [ 'user:email', 'user'] 
  }));

router.get('/github/callback', 
  passport.authenticate('github', { 
    successRedirect: "/dashboard",
    failureRedirect: '/auth/login' 
  }));

//login form
router.get("/login", forwardAuthenticated, (req: Request, res: Response) => {
  const messages = req.session.messages;
  // Clear the session messages
  req.session.messages = [];

  res.render("login", {
    messages: messages
  });
});

//login button
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
);

//logout button
router.get("/logout", (req: any, res:any) => {
  req.logout((err:any) => {
    if (err) console.log(err);
  });

  req.session.destroy(function(err:any) {
    if (err) console.log(err);
  });
  
  res.redirect("/auth/login");
});

export default router;
