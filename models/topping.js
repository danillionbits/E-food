const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
	name: String,
	type: String,
	price: Number
})

toppingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Topping', toppingSchema);