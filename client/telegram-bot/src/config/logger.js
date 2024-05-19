import { createLogger, transports, format } from "winston";

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: "api-request" },
    transports: [
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/info.log", level: "info" }),
        new transports.File({ filename: "logs/combined.log" })
    ]
});
