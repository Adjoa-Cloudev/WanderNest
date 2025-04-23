
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Welcome Email Template
const welcomeUserEmail = (name) => `
  <div style="font-family: Arial, sans-serif; padding: 30px; background: #f9f9f9; border-radius: 8px;">
    <h2 style="color: #2c3e50;">Welcome to WanderNest 🌍</h2>
    <p>Hello <strong>${name}</strong>,</p>
    <p>Thank you for signing up. We look forward to an amazing adventure with you!</p>
    <a href="https://yourfrontendurl.com/dashboard" 
       style="display: inline-block; padding: 12px 20px; background: #27ae60; color: white; text-decoration: none; border-radius: 5px;">
      Get Started
    </a>
    <p style="margin-top: 30px;">Best wishes,<br/>The WanderNest Team</p>
  </div>
`;

// Tour Added Confirmation Template
const tourAddedEmail = (name) => `
  <div style="font-family: Arial, sans-serif; padding: 30px; background: #fffefc; border-radius: 8px;">
    <h2 style="color: #2c3e50;">New Tour Added ✅</h2>
    <p>Hello <strong>${name}</strong>,</p>
    <p>Thank you for adding a tour. This is a confirmation that your tour has been added successfully.</p>
    <a href="https://yourfrontendurl.com/operator/tours" 
       style="display: inline-block; padding: 12px 20px; background: #2980b9; color: white; text-decoration: none; border-radius: 5px;">
      Take Me to My Tour
    </a>
    <p style="margin-top: 30px;">Best wishes,<br/>The WanderNest Team</p>
  </div>
`;

export const sendWelcomeEmail = async (to, name) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to WanderNest 🎉',
    html: welcomeUserEmail(name),
  });
};

export const sendTourAddedEmail = async (to, name) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'New Tour Added 🚀',
    html: tourAddedEmail(name),
  });
};
