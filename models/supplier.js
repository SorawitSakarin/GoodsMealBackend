const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    name:{type: String, required:true},
    address:{type: String, required:true},
    location: {
        lat:{type:String, required:true},
        lng:{type:String, required:true}
    },
    email:{type: String, required:true ,unique:true},   //unique ทำให้ค้นหาไวขึ้น
    firebaseAuth:{type: Object }
});


supplierSchema.plugin(uniqueValidator);  //Search uniquq faster and already exist

module.exports = mongoose.model('Supplier',supplierSchema);



