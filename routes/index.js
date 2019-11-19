const express = require("express");
const router = express.Router();

const UserController = require('../app/controllers/UserController');
const verifyToken = require('../app/security/authentication');
const authenticate = require('./authenticate');

router.get("/user/all", verifyToken, UserController.index);
router.get("/user/:token", verifyToken, UserController.show);
router.post("/user/create", UserController.create);
router.put("/user/update/:token", verifyToken, UserController.update);
router.delete("/user/delete/:token", verifyToken, UserController.delete);
router.post("/auth", authenticate.post);

module.exports = router;