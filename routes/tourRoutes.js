const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

router.param('id', tourController.checkID);

//Create a checkBody middleware
//Check if body contains price and name property
//If not, send back 404

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
