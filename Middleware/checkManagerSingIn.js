import Joi from 'joi';
import validationHelper from '../Helpers/validationHelper';

const checkManagerSignIn = (req, res, next) => {
  const signInSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{3,30}$/).min(8).required(),
  });
  const schemasValidation = Joi.validate(req.body, signInSchema);
  validationHelper(res, schemasValidation, next);
};
export default checkManagerSignIn;
