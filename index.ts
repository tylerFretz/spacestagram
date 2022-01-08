require('dotenv').config();
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
require('express-async-errors');
import cors from 'cors';
const helmet = require('helmet');
import compression from 'compression';
const postRouter = require('./controllers/postController');

const app = express();

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	app.use(compression());
	mongoose.connect(process.env.MONGO_URI ?? '')
		.then(() => console.log('Connected to database'))
		.catch(err => console.error(err));
} 
else if (process.env.NODE_ENV === 'test') {
	mongoose.connect(process.env.MONGO_TEST_URI ?? '')
		.then(() => console.log('Connected to test database'))
		.catch(err => console.error(err));
}

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/posts', postRouter);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});

export default app;