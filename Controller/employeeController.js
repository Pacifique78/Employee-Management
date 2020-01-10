import { querry } from '../Db/index';
import sendMail from '../Helpers/sendEmail';

class Employee {
  async addEmployee(req, res) {
    try {
      const {
        name, nationalid, phoneNumber, email, dob, position,
      } = req.body;
      const status = 'Inactive';
      const insertQuery = 'INSERT INTO employees (name, nationalid, phoneNumber, email, dob, status, position) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
      const result = await querry(insertQuery, [name, nationalid, phoneNumber, email, dob, status, position]);
      const { id } = result[0];
      sendMail('', email);
      return res.status(201).json({
        status: 201,
        message: 'Employee was successful added',
        data: {
          id,
          name,
          email,
        },
      });
    } catch (error) {
      return res.status(409).json({
        status: 409,
        error: error.detail,
      });
    }
  }
}
export default Employee;
