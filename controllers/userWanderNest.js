import bcrypt from 'bcrypt';
import User from '../models/userModels.js';
import { validateTouristRegistration, validateTourOperatorRegistration } from '../validators/userWanderNest.js';

const registerTourist = async (req, res) => {
  try {
    const { error } = validateTouristRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { fullName, userName, email, phoneNumber, password, profilePicture } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists.');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new tourist user
    const user = new User({
      userType: 'tourist',
      fullName,
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
      profilePicture
    });

    await user.save();
    res.status(201).send('Tourist registered successfully!');
  } catch (err) {
    res.status(500).send('Error registering tourist: ' + err.message);
  }
};

const registerTourOperator = async (req, res) => {
  try {
    const { error } = validateTourOperatorRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { businessName, location, servicesDescription, rateCard, userName, email, password, profilePicture } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists.');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new tour operator user
    const user = new User({
      userType: 'tour_operator',
      businessName,
      location,
      servicesDescription,
      rateCard,
      userName,
      email,
      password: hashedPassword,
      profilePicture
    });

    await user.save();
    res.status(201).send('Tour operator registered successfully!');
  } catch (err) {
    res.status(500).send('Error registering tour operator: ' + err.message);
  }
};

export { registerTourist, registerTourOperator };
