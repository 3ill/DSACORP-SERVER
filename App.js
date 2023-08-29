import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './connect.js';
import router from './routes/apiRoutes.js';
dotenv.config();
const { URL } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/dsacorp', router);

app.get('/', (req, res) => {
  res.send('Welcome to DSA SERVER');
});

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
