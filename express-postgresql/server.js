require("dotenv").config();

const express = require("express");
const auth = require("./src/routers/auth");
const kdrama = require("./src/routers/kdrama");
const discussion = require("./src/routers/discussion");
const comments = require("./src/routers/comments");

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000000,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/kdrama", kdrama);
app.use("/discussion", discussion);
app.use("/comments", comments);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
