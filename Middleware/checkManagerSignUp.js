import Joi from 'joi';
import validationHelper from '../Helpers/validationHelper';

const checkManagerSignUp = (req, res, next) => {
  const signUpSchema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .required(),
    nationalid: Joi.string()
      .min(14)
      .max(14)
      .required(),
    phoneNumber: Joi.string().regex(/^\+2507[2-3]\d{7}?/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    dob: Joi.date().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{3,30}$/).min(8).required(),
  });
  const schemasValidation = Joi.validate(req.body, signUpSchema);
  validationHelper(res, schemasValidation, next);
};
export default checkManagerSignUp;
