import { ensureAuthenticated } from "./middleware/checkAuth";
import passportMiddleware from "./middleware/passportMiddleware";
import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";

const express        = require("express");
const expressLayouts = require("express-ejs-layouts");
const session        = require("express-session");
const path           = require("path");
const flash          = require("express-flash");
const passport       = require('passport');

const port = process.env.port || 8003;
const app  = express();

app.use(require('express-flash')());

//use ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//for CSS 
app.use('/public', express.static('public', {
  setHeaders: (res: { setHeader: (arg0: string, arg1: string) => void; }, path: string) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  },
}));

//initialize express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new session.MemoryStore(),
  })
);

app.use(flash());

// Add middleware to clear flash messages
app.use((req: { flash: () => any; }, res: { locals: { messages: any; }; }, next: () => void) => {
  res.locals.messages = req.flash();
  next();
});

// Middleware
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(app);

app.use((req: { user: any; session: {
  id(id: any): unknown; passport: any; 
}; }, res: any, next: () => void) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire sessionID object:");
  console.log(req.session.id);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);

// Define the '/auth/login' route handler
app.post('/auth/login', (req: any, res: any, next: any) => {
  // Clear flash messages before handling the request
  req.flash('error', '');

  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash('error', info.message); // Set flash message for current error
      return res.redirect('/auth/login');
    }

    req.logIn(user, (err: any) => {
      if (err) {
        return next(err);
      }

      // Store the user's name in the session
      req.session.name = user.name;

      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

// GitHub login callback route
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/auth/login' }), (req: any, res: any) => {
  res.redirect('/dashboard');
});

// checks if the user is logged in
//redirects user to the /auth/login if they try to access the /dashboard but not logged in
app.get('/dashboard', ensureAuthenticated, (req: any, res: any) => {
  res.render('dashboard', {
    name: req.session.name,
  });
});

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
