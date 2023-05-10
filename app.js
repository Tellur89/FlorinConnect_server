const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/authenticator");
const postRouters = require("./routers/postsRoutes");
const userRoutes = require("./routers/usersRoutes");
const tokenRoutes = require("./routers/tokensRoutes");
const refreshRoutes = require("./routers/refreshRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/tokens", tokenRoutes);
app.use("/refresh", refreshRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.cookie("cookieName", "cookieValue", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json("Florin Connect Api");
});
//anything below this will need authorization
app.use(verifyJWT);

app.use("/posts", postRouters);

module.exports = app;
