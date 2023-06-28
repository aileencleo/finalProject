import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import {userModel} from '../../models/userModel';

const fetch = require("isomorphic-fetch");

interface Email {
  primary: boolean;
  verified: boolean;
  email: string;
}

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        //
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:8003/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log("GitHub profile email:", profile.email);
    
      try {
        const response = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${accessToken}`,
            'User-Agent': 'request',
          },
        });
        const emails = await response.json() as Email[];
    
        const primaryEmail = emails.find((email) => email.primary && email.verified);
        const email = primaryEmail ? primaryEmail.email : '';
    
        console.log('GitHub profile email:', email);
    
        const user = userModel.findOne(email);
    
        if (!user) {
          // Handle user not found
          return done(null, false, { message: 'User not found' });
        }
    
        req.logIn(user, (err: any) => {
          if (err) {
            return done(err);
          }
          req.session.name = user.name;
          return done(null, user);
        });
      } catch (error) {
        return done(error);
      }
    } 
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
