import * as express from "express";
import { ensureAuthenticated, isAdmin } from "../middleware/checkAuth";
import { Response} from 'express';

const router = express.Router();

//to root/main
router.get("/", (req, res) => {
  res.send("welcome");
});

//to dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user, // Pass the user object to the template
  });
});

//admin
router.get("/admin", ensureAuthenticated, isAdmin, (req: any, res: Response) => {
  const sessions = Object.entries(req.sessionStore.sessions).map(([sessionId, sessionData]) => {
    const session = JSON.parse(sessionData as any);
    const userId = session.passport && session.passport.user;
    console.log(userId);

    return {
      sessionId,
      userId: userId || null,
    };
  });

  res.render("admin", {
    sessions,
    user: req.user,
  });
});

router.get("/admin/revoke-session/:sessionId", (req: any, res: Response) => {
  const sessionId = req.params.sessionId;
  req.sessionStore.destroy(sessionId, (err: any) => {
    if (err) {
      console.log(err);
      res.redirect("/admin"); // Handle any error, redirect back to the admin page
    } else {
      res.redirect("/admin"); // Session successfully destroyed, redirect back to the admin page
    }
  });
});

export default router;
