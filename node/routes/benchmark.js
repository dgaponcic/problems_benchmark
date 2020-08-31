const express = require('express');
const passport = require('passport');
const BenchmarkController = require('../controllers/benchmark');
const async_middleware = require('../common/error_handling/async_middleware');
const router = express.Router();

router.post(
  "/",
  passport.authenticate('jwt', { session: false }),
  async_middleware(BenchmarkController.test),
);

router.get(
  "/problems",
  passport.authenticate('jwt', { session: false }),
  async_middleware(BenchmarkController.get_all_problems),
);

router.get(
  "/problems/search",
  passport.authenticate('jwt', { session: false }),
  async_middleware(BenchmarkController.search_problems),
);

router.get(
  "/problems/:id",
  passport.authenticate('jwt', { session: false }),
  async_middleware(BenchmarkController.get_problem),
);

router.post(
  "/problems",
  passport.authenticate('jwt', { session: false }),
  async_middleware(BenchmarkController.create_problem),
)

router.post(
  "/tests",
  passport.authenticate('jwt', { session: false }),
  async_middleware(BenchmarkController.add_test),
)

router.post(
  "/:problemId/result",
  passport.authenticate('jwt', { session: false }),
  async_middleware(BenchmarkController.submit_result),
)

module.exports = router;
