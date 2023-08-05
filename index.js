const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const { logEvents, logger } = require("./middleware/logEvents.js");
const path = require("path");
const errorHandler = require("./middleware/errorHandler.js");
const session = require("express-session");

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "https://myblog-app-tan.vercel.app",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://myblog-app-tan.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With,Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", function (req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://myblog-app-tan.vercel.app"
  ); // Replace with your client's domain
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.use(
  session({
    secret: "jwtkey", // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);
// const PORT = process.env.port || 3001;
const PORT = 3001;
app.use(express.json());
app.use(cookieParser());

app.use(logger);
// app.use(logEvents);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// const upload = multer({ dest: './upload' });
// const upload = multer({ storage: storage });
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json("Image has been uploaded");
  // res.status(200).json(file.filename);
  // console.log(file.filename);
});

// 	PROFILE
// const profileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../client/public/profile");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });
// const profileUpload = multer({ storage: profileStorage });
// app.post("/api/profileUpload", profileUpload.single("profile"), (req, res) => {
//   const file = req.file;
//   res.status(200).json(file.filename);

//   console.log(file.filename, "profileUpload");
//   // console.log(req.method);
// });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
