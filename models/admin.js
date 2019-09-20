const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
	name: String,
	username: String,
	email: String,
	passwordHash: String,
	shop:
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop'
		}
})


adminSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Admin', adminSchema);