import Joi from 'joi';

export const validateNewTour = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    rateCard: Joi.string().required(),
    description: Joi.string().required(),
    availableSlots: Joi.number().required(),
    date: Joi.date().required(),
    image: Joi.string().uri().required(),  
    status: Joi.string().valid('available', 'unavailable')
  });
  return schema.validate(data);
};

export const validateUpdateTour = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    location: Joi.string(),
    rateCard: Joi.string(),
    description: Joi.string(),
    availableSlots: Joi.number(),
    date: Joi.date(),
    image: Joi.string().uri(),
    status: Joi.string().valid('available', 'unavailable')
  });
  return schema.validate(data);
};

export const validateNewReview = (data) => {
  const schema = Joi.object({
    location: Joi.string().required(),
    companion: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
  });
  return schema.validate(data);
};
