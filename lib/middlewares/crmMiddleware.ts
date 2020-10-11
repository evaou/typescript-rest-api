import { Request, Response, NextFunction } from "express";
import * as env from "env-var";

const SECRET_KEY: string = env.get("SECRET_KEY").required().asString();

export class ContactMiddleware {
  public checkSecretKey(req: Request, res: Response, next: NextFunction) {
    if (req.query.key !== SECRET_KEY) {
      res.status(401).send("You shall not pass!");
    } else {
      next();
    }
  }
}
