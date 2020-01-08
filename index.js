import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './Routes/authRoutes';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => res.status(200).json({ message: 'WELCOME TO EMPLOYEE MANAGEMENT SYSTEM' }));
app.use(authRoutes);
app.use((req, res) => res.status(400).json({
  status: 400,
  error: 'The route was not found',
}));
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening to port ${port}`));
export default app;
