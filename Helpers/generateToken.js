import jwt from 'jsonwebtoken';

const generateToken = (id, email, status, position) => jwt.sign({
  id, email, status, position,
}, process.env.secret, {
  expiresIn: '7d',
});
export default generateToken;
