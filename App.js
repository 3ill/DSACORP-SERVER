import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './connect.js';
import router from './routes/mailRoutes.js';
dotenv.config();
const { URL } = process.env;

const app = express();
app.use(express.json());

app.use('/api/v1/dsacorp', router);

const port = 5000;

const startServer = async () => {
  try {
    connectDB(URL);
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error, 'An unexpected error occurred');
  }
};

startServer();
