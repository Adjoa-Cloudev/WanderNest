import Joi from 'joi';

export const validateTouristRegistration = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).required(),
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(10).required(),
    password: Joi.string().min(6).required(),
    profilePicture: Joi.string().optional()
  });
  return schema.validate(data);
};

export const validateTourOperatorRegistration = (data) => {
  const schema = Joi.object({
    businessName: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    servicesDescription: Joi.string().min(5).required(),
    rateCard: Joi.string().min(5).required(),
    profilePicture: Joi.string().optional(),
    userName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};
