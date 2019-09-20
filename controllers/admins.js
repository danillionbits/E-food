const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminsRouter = require('express').Router();
const Admin = require('../models/admin');

adminsRouter.get('/', async (request, response) => {
	const admins = await Admin
		.find({})
		.populate('shop', {})
	  
	  response.json(admins.map(a => a.toJSON()))
})

adminsRouter.post('/login', async (request, response, next) => {
	const body = request.body;

	const admin = await Admin.findOne({ username: body.username });
	const passwordCorrect = admin === null
		? false
		: await bcrypt.compare(body.password, admin.passwordHash);

	if(!(admin && passwordCorrect)){
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const adminForToken = {
		username: admin.username,
		id: admin._id
	}

	const token = jwt.sign(adminForToken, process.env.SECRET);

	response.
        status(200).
        header({"auth-token":token}).
        send({
            'auth-token':token,
            'username': admin.username,
            'name': admin.name,
            'shop': admin.shop,
            'email':admin.email
        })

})




adminsRouter.post('/register', async (request, response, next) => {
	try{
		const body = request.body;	

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(body.password, saltRounds);

		const admin = new Admin({
			name: body.name,
			username: body.username,
			email: body.email,
			passwordHash,
			shop: body.shop
		})
		
		const savedAdmin = await admin.save();
		
		response.json(savedAdmin);

	} catch (exception) {
		next(exception)
	}

})

module.exports = adminsRouter;