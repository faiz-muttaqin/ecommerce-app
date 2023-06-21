import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

//configure env
dotenv.config();

//rest object
const app = express();

//database config
connectDB();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routing
app.use('/api/v1/auth', authRoutes);

const port = process.env.PORT || 8000;

app.get('/', (req, res) => 
    res.send("<h1>Wellcome to my first Node.js app</h1>")
);

app.listen(port, () => console.log(`Server running  ${process.env.DEV_MODE} mode on port http://localhost:${port} !`.bgCyan.white));