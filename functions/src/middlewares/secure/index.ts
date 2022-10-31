import helmet from "helmet";
import * as cors from "cors";
import { Application } from "express";
import rateLimiter from "express-rate-limit";
import * as slowDown from "express-slow-down";

/**
 * Protect application from DDOS and XSS
 * @param {Request} app
 */
function secure(app: Application) {
  app.use(
    cors({
      origin: ["https://reflexio-2.web.app", "http://localhost:3000"],
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
      },
    })
  );

  const limiter = rateLimiter({
    windowMs: 60 * 1000,
    max: 120, // limit each IP to 120 requests per minute
  });

  const speedLimiter = slowDown({
    windowMs: 60 * 1000,
    delayAfter: 100, // allow 100 requests per minute,
    delayMs: 1000, // adding 1000ms of delay per request above 100
    // request # 101 is delayed by 1000ms
    // request # 102 is delayed by 2000ms
  });

  app.use(speedLimiter);
  app.use(limiter);
  app.disable("x-powered-by");
}

export default secure;
