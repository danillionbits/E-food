const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: String,
	category: {	
		type: mongoose.Schema.Types.ObjectId,
	  ref: 'Category'	
	},
	toppings: [
		{	
			type: mongoose.Schema.Types.ObjectId,
		  ref: 'Topping'	
		}
	],
	extras: [
		{	
			type: mongoose.Schema.Types.ObjectId,
		  ref: 'Topping'	
		}
	],
	spices: [
		{	
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Spice'	
		}
	],
	price: Number,
	score: Number
})



productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema);