
import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewares/userAuth.js';
import upload from '../middlewares/upload.js';
import {
  createTour,
  updateTour,
  getOperatorTours,
  getAllTours,
  getTourById,
  createReview,
  getOperatorReviews,
  deleteReview,
  getAllReviews
} from '../controllers/wanderNest.js';

const router = express.Router();

// Tour routes
router.post('/', isAuthenticated, isAuthorized(['tour_operator']), upload, createTour);
router.patch('/:id', isAuthenticated, isAuthorized(['tour_operator']), updateTour);
router.get('/my-tours', isAuthenticated, isAuthorized(['tour_operator']), getOperatorTours);
router.get('/:id', getTourById); 
router.get('/', getAllTours);

// Review routes
router.post('/operators/:operatorId/reviews', isAuthenticated, createReview);
router.get('/operators/:operatorId/reviews', getOperatorReviews);
router.delete('/operators/:operatorId/reviews/:reviewId', isAuthenticated, deleteReview);
router.get('/reviews', getAllReviews);



export default router;
