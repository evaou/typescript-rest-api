import * as amqp from "amqplib/callback_api";
import * as env from "env-var";

const RABBITMQ_USERNAME: string = env
  .get("RABBITMQ_USERNAME")
  .required()
  .asString();
const RABBITMQ_PASSWORD: string = env
  .get("RABBITMQ_PASSWORD")
  .required()
  .asString();
const RABBITMQ_URL: string = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@localhost`;

amqp.connect(RABBITMQ_URL, (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = "hello";
    ch.assertQueue(q, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    ch.consume(
      q,
      (msg) => {
        console.log(" [x] Received %s", msg.content);
      },
      {
        noAck: true,
      }
    );
  });
});
