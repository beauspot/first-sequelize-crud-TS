import "reflect-metadata";
import hpp from "hpp";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
// import xss from "xss-clean";
import helmet from "helmet";
import session from "express-session";
import compression from "compression";
import cookieprser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();

// Internal Module Imports 
import connection from "./config/connection";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(compression());
app.use(cookieprser());
app.use(helmet());
app.use(hpp());
// app.use(xss());
app.use(
  cors({
    credentials: true,
  })
);

app.use(
  session({
    resave: false,
    secret: process.env.SESSION_SECRET_KEY!,
    saveUninitialized: true,
    //store: store,
    cookie: {
      sameSite: "strict",
      secure: false, // use true if using https
      maxAge: 1000 * 60 * 60, // cookie would expire in 1 hour
    },
  })
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome to Esxpress REST API with Typescript And Sequelize.",
  });
});

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3030;

const start = async (): Promise<void> => {
  try {
    await connection.authenticate();
    console.log("Connected to the Database.");
    app.listen(SERVER_PORT, () =>
      console.log(`Server started on port ${SERVER_PORT}!!!`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
