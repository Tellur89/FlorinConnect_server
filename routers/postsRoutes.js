const { Router } = require("express");

const postControllers = require("../controllers/postsControllers");

const postRouters = Router();

postRouters.route("/").get(postControllers.index).post(postControllers.create);

postRouters
  .get("/category/:type", postControllers.getByCategory)
  .get("/status/open", postControllers.getByOpen)
  .get("/status/accepted", postControllers.getByAccepted)
  .get("/status/completed", postControllers.getByCompleted)
  .get("/date/:date", postControllers.getByDate)
  .get("/date/:startDate/:endDate", postControllers.getBetweenDates)
  .get("/word/:word", postControllers.getByWord);

postRouters
  .route("/:id")
  .get(postControllers.show)
  .patch(postControllers.update)
  .delete(postControllers.destroy);

module.exports = postRouters;
