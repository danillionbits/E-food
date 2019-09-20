const categoriesRouter = require('express').Router();
const Category = require('../models/category');

categoriesRouter.get('/', (request, response) => {
	Category.find({})
		.then(categories  => {
			response.json(categories);
		})
});

categoriesRouter.get('/:id', async (request, response, next) => {
	try {
		const category = await Category.findById(request.params.id);
		if(category) response.json(category.toJSON());
		else response.status(404).end();
	} catch(exception) {
		next(exception)
	}
});

categoriesRouter.post('/', async (request, response) => {
	const body = request.body;

	const category = new Category({
		name: body.name
	})

	const savedCategory = await category.save();
	response.json(savedCategory.toJSON());
});

categoriesRouter.put('/:id', async (request, response, next) => {
	const body = request.body;

	const category = {
		name: body.name
	}

	Category.findByIdAndUpdate(request.params.id, category, { new: true })
		.then(updatedCategory => {
			response.json(updatedCategory.toJSON());
		})
		.catch(error => next(error))
});

categoriesRouter.delete('/:id', async (request, response, next) => {
	try {
		await Category.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch(exception) {
		next(exception);
	}
});


module.exports = categoriesRouter;