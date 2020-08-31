const express = require('express');
const UserController = require('../controllers/user');
const async_middleware = require('../common/error_handling/async_middleware');
const router = express.Router();

router.post(
  "/",
  async_middleware(UserController.createUser),
);

router.post(
  "/login",
  async_middleware(UserController.login),
);


router.get(
  "/type",
  async_middleware(UserController.getType),
);

module.exports = router;
