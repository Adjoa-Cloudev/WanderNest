
import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewares/userAuth.js';
import upload from '../middlewares/upload.js';
import {
  createTour,
  updateTour,
  getOperatorTours,
  getAllTours
} from '../controllers/wanderNest.js';

const router = express.Router();

// Only tour operators can create and update tours
router.post('/', isAuthenticated, isAuthorized(['tour_operator']), upload, createTour);

router.patch('/:id', isAuthenticated, isAuthorized(['tour_operator']), updateTour);  
router.get('/my-tours', isAuthenticated, isAuthorized(['tour_operator']), getOperatorTours);  // GET /api/tours/my-tours (get operator's tours)

// Anyone (tourist) can see all tours
router.get('/', getAllTours);  // GET /api/tours (view all tours)

export default router;
