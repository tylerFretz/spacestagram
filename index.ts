require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const postRouter = require('./controllers/postController');

const app = express();

app.use(helmet({
	contentSecurityPolicy: false
}));
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'test') {
	mongoose.connect(process.env.MONGO_TEST_URI ?? '')
		.then(() => console.log('Connected to test database'))
		.catch(err => console.error(err));
} 
else {
	app.use(compression());
	mongoose.connect(process.env.MONGO_URI ?? '')
		.then(() => console.log('Connected to database'))
		.catch(err => console.error(err));
}
console.log(path.join(__dirname, './client/build'));

app.use(express.static(path.join(__dirname, './client/build')));

app.use('/api/posts', postRouter);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './client/build'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = { app };