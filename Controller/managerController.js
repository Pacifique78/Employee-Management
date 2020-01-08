import dotenv from 'dotenv';
import generateToken from '../Helpers/generateToken';
import hashPassword from '../Helpers/hashPassword';
import { querry } from '../Db';

dotenv.config();
class ManagerAuth {
  async signUp(req, res) {
    const {
      name, nationalid, phoneNumber, email, dob, status, password,
    } = req.body;
    const selectQuery = 'SELECT * FROM employees where email=$1 ;';
    const value = [email];
    const rows = await querry(selectQuery, value);
    if (rows[0]) {
      return res.status(409).json({
        status: 409,
        error: `Manager with ${email} already exists`,
      });
    }
    const pass = hashPassword(password);
    const position = 'Manager';
    const insertQuery = 'INSERT INTO employees (name, nationalid, phoneNumber, email, dob, status, position, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
    const result = await querry(insertQuery, [name, nationalid, phoneNumber, email, dob, status, position, pass]);
    const { id } = result[0];
    const token = generateToken(id, email);
    return res.status(201).json({
      status: 201,
      message: 'User created',
      data: {
        id,
        name,
        email,
      },
      token,
    });
  }
}
export default ManagerAuth;
