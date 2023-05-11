const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/authenticator");
const postRouters = require("./routers/postsRoutes");
const userRoutes = require("./routers/usersRoutes");
const tokenRoutes = require("./routers/tokensRoutes");
const refreshRoutes = require("./routers/refreshRoutes");
const authRoutes = require("./routers/authRoutes");
const logoutRouters = require("./routers/logoutRoutes");

const app = express();

// Set up CORS headers
// const corsOptions = {
// 	origin: ['http://localhost:3000', 'https://florinconnectapi.onrender.com/', 's3://florinconnect/'],
// 	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
// 	allowedHeaders: ['Content-Type', 'Authorization'],
// 	exposedHeaders: ['Authorization'],
// 	credentials: true,
// 	preflightContinue: false,
// 	optionsSuccessStatus: 204,
// };
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.use("/tokens", tokenRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRouters);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.cookie("cookieName", "cookieValue", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json("Florin Connect Api");
});
// anything below this will need authorization
app.use(verifyJWT);

app.use("/posts", postRouters);

module.exports = app;
