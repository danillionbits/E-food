const toppingsRouter = require('express').Router();
const Topping = require('../models/topping');

toppingsRouter.get('/', (request, response) => {
	Topping.find({})
		.then(toppings => {
			response.json(toppings);
		})
});

toppingsRouter.post('/', async (request, response) => {
	const body = request.body;

	const topping = new Topping({
		name: body.name,
		type: body.type,
		price: body.price
	})

	const savedTopping = await topping.save();
	response.json(savedTopping.toJSON());
});

toppingsRouter.delete('/:id', async (request, response, next) => {
	try {
		await Topping.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch(exception) {
		next(exception);
	}
});


module.exports = toppingsRouter;