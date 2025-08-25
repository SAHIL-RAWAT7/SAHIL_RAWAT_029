import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/dbConfig.js';
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blogs.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', blogRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

dbConnect()

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})
