
import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewares/userAuth.js';
import upload from '../middlewares/upload.js';
import {
  createTour,
  updateTour,
  getOperatorTours,
  getAllTours,
  createReview,
  deleteReview,
  getAllReviews
} from '../controllers/wanderNest.js';

const router = express.Router();

router.post('/', isAuthenticated, isAuthorized(['tour_operator']), upload, createTour);
router.patch('/:id', isAuthenticated, isAuthorized(['tour_operator']), updateTour);  
router.get('/my-tours', isAuthenticated, isAuthorized(['tour_operator']), getOperatorTours);  
router.get('/', getAllTours);  

router.post('/operators/:operatorId/reviews', isAuthenticated, createReview);  
router.delete('/operators/:operatorId/reviews/:reviewId', isAuthenticated, deleteReview);  

router.get('/reviews', getAllReviews);

export default router;
