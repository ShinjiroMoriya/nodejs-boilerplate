import "./modules/readEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";
import csrf from "csurf";
import router from "./routers/index.js";
import { RedisStore, redis } from "./modules/session.js";

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "randomString_cAdHEXQB37hjLBghnzQykYSLcaWsDH",
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redis }),
  })
);

app.use(flash());
app.use(csrf({ cookie: true }));

app.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403);
  res.send("Forbidden");
});

app.set("views", "./templates");
app.set("view engine", "ejs");
app.use("/static", express.static("static"));
app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${process.env.PORT || 3000}`);
});
