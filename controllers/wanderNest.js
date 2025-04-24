import { Tour, Review } from '../models/wanderNestApp.js';
import { validateNewTour, validateUpdateTour, validateNewReview } from '../validators/wanderNestapp.js';

export const createTour = async (req, res) => {
  try {
    console.log('Auth Info:', req.auth); 
    console.log('Incoming Body:', req.body);
    console.log('Uploaded File:', req.file);

    const imageUrl = req.file?.path;
    if (!imageUrl) {
      console.log('Image missing from request');
      return res.status(400).json({ message: 'An image is required.' });
    }

    req.body.image = imageUrl;

    const { error } = validateNewTour(req.body);
    if (error) {
      console.log('Validation Error:', error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const tour = new Tour({
      ...req.body,
      operator: req.auth?.id || 'Missing Auth ID',
    });

    await tour.save();
    return res.status(201).json({ message: 'Tour created successfully', tour });

  } catch (err) {
    console.error('Internal Server Error:', err);
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = validateUpdateTour(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const tour = await Tour.findOne({ _id: id, operator: req.auth.id });
    if (!tour) return res.status(404).json({ message: 'Tour not found or unauthorized' });

    if (req.file) {
      req.body.image = req.file.path; 
    }

    Object.assign(tour, req.body); 
    await tour.save();

    return res.status(200).json({ message: 'Tour updated successfully', tour });

  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

export const getOperatorTours = async (req, res) => {
  try {
    const tours = await Tour.find({ operator: req.auth.id });
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

export const getAllTours = async (req, res) => {
  try {
    const { search } = req.query;

    const tours = await Tour.find({ status: 'available' }).populate('operator', 'businessName');

    let filteredTours = tours;

    if (search) {
      const regex = new RegExp(search, 'i'); 

      filteredTours = tours.filter(tour =>
        regex.test(tour.title) ||
        regex.test(tour.location) ||
        regex.test(tour.rateCard) ||
        regex.test(tour.operator?.businessName)
      );
    }

    res.status(200).json(filteredTours);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

// New Review Handling Logic

export const createReview = async (req, res) => {
  try {
    const { error } = validateNewReview(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { operatorId } = req.params; 
    const operator = await Tour.findOne({ operator: operatorId }); 
    if (!operator) return res.status(404).json({ message: 'Operator not found' });

    const review = new Review({
      ...req.body,
      operatorId, 
      reviewedBy: req.auth.id,
    });

    await review.save();

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

export const getOperatorReviews = async (req, res) => {
  try {
    const { operatorId } = req.params; // Fetching reviews for operator
    const reviews = await Review.find({ operatorId }).populate('reviewedBy', 'fullName');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { operatorId, reviewId } = req.params;

    const review = await Review.findOneAndDelete({ _id: reviewId, reviewedBy: req.auth.id, operatorId });
    if (!review) return res.status(404).json({ message: 'Review not found or unauthorized' });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

