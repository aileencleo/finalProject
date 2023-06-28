import { Request, Response, NextFunction, RequestHandler } from "express";

/*
FIX ME (types)
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types)
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}

//checks if user has an admin role
export const isAdmin: RequestHandler = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.redirect('/dashboard');
};