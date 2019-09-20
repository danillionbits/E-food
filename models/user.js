const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	name: String,
	username: {
		type: String,
		unique: true
	},
	email: String,
	passwordHash: String,
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;