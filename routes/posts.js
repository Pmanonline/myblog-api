const express = require("express");
const {
  addPost,
  deletePost,
  getOnePost,
  getAllPosts,
  updatePost,
  getMyPosts,
  likepost,
} = require("../controllers/post.js");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/myposts/:id", getMyPosts);
router.get("/:id", getOnePost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.put("/:id", updatePost);
router.post("/:id", likepost);

// module.exports = {
//   userRoutes: router,
// };

module.exports = router;
