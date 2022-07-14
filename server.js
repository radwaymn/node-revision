require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const userRouter = require("./routers/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const loginRouter = require("./routers/loginRouter");
const profileRouter = require("./routers/profileRouter");
const mainRouter = require("./routers/mainRouter");
const logsRouter = require("./routers/logsRouter");

mongoose.connect(process.env.MONGODB_CONNECTION);
const PORT = process.env.PORT;
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: 'a' });
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common", { stream: logStream }));
app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/logs", logsRouter);
app.use("/", errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at [ http://localhost:${PORT} ]`);
});
