import Joi from 'joi';
import validationHelper from '../Helpers/validationHelper';

const checkEmployee = (req, res, next) => {
  const signUpSchema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .required(),
    nationalid: Joi.string()
      .min(16)
      .max(16)
      .required(),
    phoneNumber: Joi.string().regex(/^\+2507[2-3]\d{7}?/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    dob: Joi.date().required(),
    position: Joi.string().required(),
  });
  const schemasValidation = Joi.validate(req.body, signUpSchema);
  validationHelper(res, schemasValidation, next);
};
export default checkEmployee;
