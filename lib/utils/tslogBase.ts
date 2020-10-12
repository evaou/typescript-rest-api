import { ILogObject, Logger } from "tslog";
import { appendFileSync } from "fs";

const logger: Logger = new Logger();

function logToTransport(logObject: ILogObject) {
  appendFileSync("./message.log", JSON.stringify(logObject) + "\n");
}

logger.attachTransport(
  {
    silly: logToTransport,
    debug: logToTransport,
    trace: logToTransport,
    info: logToTransport,
    warn: logToTransport,
    error: logToTransport,
    fatal: logToTransport,
  },
  "debug"
);

export class TslogBase {
  public static log = logger;
}
