const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const auth = require("../../config/auth");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

router.post("/:userId/favorites", auth, usersCtrl.addFavorite);
router.get("/favorites", auth, usersCtrl.getFavorites);

module.exports = router;
