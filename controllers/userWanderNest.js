import bcrypt from 'bcrypt';
import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';

import { validateTouristRegistration, validateTourOperatorRegistration } from '../validators/userWanderNest.js';

const registerTourist = async (req, res) => {
  try {
    const { error } = validateTouristRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { fullName, userName, email, phoneNumber, password, profilePicture } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists.');

 
    const hashedPassword = await bcrypt.hash(password, 10);

   
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

    //  if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists.');

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password.');

    // Generate token
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        userType: user.userType,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).send('Login error: ' + err.message);
  }
};


export { registerTourist, registerTourOperator, loginUser };
