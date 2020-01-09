import dotenv from 'dotenv';
import generateToken from '../Helpers/generateToken';
import hashPassword from '../Helpers/hashPassword';
import { querry } from '../Db';
import checkPassword from '../Helpers/checkPassword';
import sendMail from '../Helpers/sendEmail';

dotenv.config();
class ManagerAuth {
  async signUp(req, res) {
    const {
      name, nationalid, phoneNumber, email, dob, password,
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
    const status = 'Inactive';
    const insertQuery = 'INSERT INTO employees (name, nationalid, phoneNumber, email, dob, status, position, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
    const result = await querry(insertQuery, [name, nationalid, phoneNumber, email, dob, status, position, pass]);
    const { id } = result[0];
    const token = generateToken(id, email, status, position);
    sendMail(token, email);
    return res.status(201).json({
      status: 201,
      message: 'Manager added, you need to confirm your email ',
      data: {
        id,
        name,
        email,
      },
      token,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const selectQuery = 'SELECT * FROM employees where email=$1 ;';
    const value = [email];
    const rows = await querry(selectQuery, value);
    if (rows[0] && checkPassword(password, rows[0].password) && rows[0].status === 'Active') {
      const { id } = rows[0];
      const token = generateToken(id, email);
      return res.status(200).json({
        status: 200,
        message: 'Logged in successfully',
        data: {
          token,
        },
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Invalid username/ password OR Email not confirmed',
    });
  }

  async confirm(req, res) {
    const { id } = req.tokenData;
    const updateQuery = 'UPDATE employees set status=$1 where id=$2';
    const values = ['Active', id];
    await querry(updateQuery, values);
    return res.status(200).json({
      status: 200,
      message: 'Email confirmed',
    });
  }
}
export default ManagerAuth;
