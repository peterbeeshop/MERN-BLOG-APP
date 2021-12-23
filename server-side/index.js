const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const app = express();

//middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.use("/blogs", blogRoute);
app.use("/user", userRoute);

//routes
app.get("/", (req, res) => res.send("Hello World!"));

//mongodb
mongoose.connect("mongodb://localhost/BlogApp");
//server
app.listen(5000, () => console.log(`Example app listening on port 5000!`));
