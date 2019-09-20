const productsRouter = require('express').Router();
const Product = require('../models/product');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

productsRouter.get('/', async (request, response) => {
	const products = await Product
		.find({})
		.populate('category', {})
		.populate('toppings', { name: 1, price: 1 })
		.populate('extras', {})
		.populate('spices', {})

	response.json(products.map(p => p.toJSON()));
});

productsRouter.get('/:id', async (request, response, next) => {
	try {
		const product = await Product.findById(request.params.id);
		if(product) response.json(product.toJSON());
		else response.status(404).end();
	} catch(exception) {
		next(exception)
	}
});

productsRouter.post('/', async (request, response, next) => {
	const body = request.body;

  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const product = new Product({
			name: body.name,
			category: body.category,
			toppings: body.toppings,
			extras: body.extras,
			spices: body.spices,
			price: body.price,
			score: body.score
		})

		const savedProduct = await product.save();
    user.products = user.products.concat(savedProduct._id)
    await user.save() 
    response.json(savedProduct.toJSON())
  } catch (exception) {
    next(exception)
  }
});

productsRouter.put('/:id', async (request, response, next) => {
	const body = request.body;

	const product = {
		name: body.name,
		category: body.category,
		toppings: body.toppings,
		extras: body.extras,
		spices: body.spices,
		prices: body.prices,
		score: body.score	
	}

	Product.findByIdAndUpdate(request.params.id, product, { new: true })
		.then(updatedProduct => {
			response.json(updatedProduct.toJSON());
		})
		.catch(error => next(error))
});

productsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Product.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})


module.exports = productsRouter;

