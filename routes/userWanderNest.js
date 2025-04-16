import express from 'express';
import { registerTourist, registerTourOperator } from '../controllers/userWanderNest.js';
import { isAuthenticated, isAuthorized } from '../middlewares/userAuth.js';

const router = express.Router();

router.post('/register/tourist', registerTourist);
router.post('/register/tour_operator', registerTourOperator);

router.get('/protected', isAuthenticated, isAuthorized(['tourist', 'tour_operator']), (req, res) => {
  res.json({ message: 'You are authorized to access this route!' });
});

export default router;

