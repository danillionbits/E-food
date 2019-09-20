const config = require('./utils/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const adminsRouter = require('./controllers/admins');
const productsRouter = require('./controllers/products');
const categoriesRouter = require('./controllers/categories');
const toppingsRouter = require('./controllers/toppings');
const spicesRouter = require('./controllers/spices');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true})
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	})


app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/toppings', toppingsRouter);
app.use('/api/spices', spicesRouter);




app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;