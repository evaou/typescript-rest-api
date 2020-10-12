import { Request, Response } from "express";
import * as amqp from "amqplib/callback_api";
import * as env from "env-var";
import { TslogBase } from "../utils/tslogBase";

const RABBITMQ_USERNAME: string = env
  .get("RABBITMQ_USERNAME")
  .required()
  .asString();
const RABBITMQ_PASSWORD: string = env
  .get("RABBITMQ_PASSWORD")
  .required()
  .asString();
const RABBITMQ_URL: string = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@localhost`;

export class MessageController {
  public sendNewMessage(req: Request, res: Response) {
    amqp.connect(RABBITMQ_URL, (err, conn) => {
      conn.createChannel((err, ch) => {
        const q = "hello";
        ch.assertQueue(q, { durable: false });

        setTimeout(() => {
          let msg = "Get data from message queue!";
          ch.sendToQueue(q, Buffer.from(msg));
          TslogBase.log.info(` [X] Send ${msg}`);
        }, 5000);
      });

      setTimeout(() => {
        conn.close();
      }, 10000);
    });

    res.json({ message: "The POST request is being processed!" });
  }
}
