const spicesRouter = require('express').Router();
const Spice = require('../models/spice');

spicesRouter.get('/', (request, response) => {
	Spice.find({})
		.then(spices => {
			response.json(spices);
		})
});

spicesRouter.post('/', async (request, response) => {
	const body = request.body;

	const spice = new Spice({
		name: body.name
	})

	const savedSpice = await spice.save();
	response.json(savedSpice.toJSON());
});

spicesRouter.delete('/:id', async (request, response, next) => {
	try {
		await Spice.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch(exception) {
		next(exception);
	}
});


module.exports = spicesRouter;