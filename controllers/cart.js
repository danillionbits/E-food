const cartRouter = require('express').Router();
const Product = require('../models/product');

cartRouter.post('/', async (request, response) => {
	let products = [];
	let cart = JSON.parse(request.body.cart);
	if(!cart) return


});
