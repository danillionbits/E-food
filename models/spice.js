const mongoose = require('mongoose');

const spiceSchema = new mongoose.Schema({
	name: String
});

spiceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Spice', spiceSchema);