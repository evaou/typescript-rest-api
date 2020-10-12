import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import * as env from "env-var";

const MONGODB_USERNAME: string = env
  .get("MONGODB_USERNAME")
  .required()
  .asString();
const MONGODB_PASSWORD: string = env
  .get("MONGODB_PASSWORD")
  .required()
  .asString();
const MONGODB_URL: string = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017/CRMdb`;

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new App().app;
