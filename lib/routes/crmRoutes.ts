import { Request, Response } from "express";
import { ContactController } from "../controllers/crmController";
import { ContactMiddleware } from "../middlewares/crmMiddleware";
import { MessageController } from "../controllers/messageController";

export class Routes {
  public contactController: ContactController = new ContactController();
  public contactMiddleware: ContactMiddleware = new ContactMiddleware();
  public messageController: MessageController = new MessageController();

  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "Get request successfully!!!",
      });
    });

    app
      .route("/contact")
      .get(
        this.contactMiddleware.checkSecretKey,
        this.contactController.getContacts
      )
      .post(this.contactController.addNewContact);

    app
      .route("/contact/:contactId")
      .get(this.contactController.getContactById)
      .put(this.contactController.updateContact)
      .delete(this.contactController.deleteContact);

    app.route("/messages").post(this.messageController.sendNewMessage);
  }
}
