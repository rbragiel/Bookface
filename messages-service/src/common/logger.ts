import { createLogger, transports, format } from "winston";

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "messages-service" },
  transports: new transports.Console({
    format: format.combine(format.colorize()),
  }),
});

export { logger };
