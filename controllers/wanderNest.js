import Tour from '../models/wanderNestApp.js';
import { validateNewTour, validateUpdateTour } from '../validators/wanderNestapp.js';

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

    console.log('Tour saved:', tour);

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
      req.body.image = req.file.path; // Make sure you are using 'image' instead of 'images'
    }

    Object.assign(tour, req.body); 
    await tour.save();

    // Ensure proper response formatting
    return res.status(200).json({ message: 'Tour updated successfully', tour });

  } catch (err) {
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

// Get tours for current tour operator
export const getOperatorTours = async (req, res) => {
  try {
    const tours = await Tour.find({ operator: req.auth.id });
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

// Get all tours (for tourists)
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({ status: 'available' });
    res.status(200).json(tours);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};
