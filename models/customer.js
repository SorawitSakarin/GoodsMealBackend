const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    
    status:{type: String},    //unsubscription, subscription
    lineId:{type: String},
    lineName:{type: String, required:true},
    name:{type: String, required:true},
    sex:{type: String, required:true},
    dob:{type: String, required:true},
    tel:{type: String, required:true ,unique:true},   //unique ทำให้ค้นหาไวขึ้น
    address: {
        lat:{type: String},
        lng:{type: String},
        province: {type: String},
        district: {type: String},
        subDistrict:{type: String},
        postalCode: {type: String},
        locationCode: {type: String},
        locationName:{type: String},
        address: {type: String, required:true},
    },

    orders: [{type: mongoose.Types.ObjectId, required: true, ref:'Order'}],
    suborders: [{type: mongoose.Types.ObjectId, required: true, ref:'SubOrder'}],

});


customerSchema.plugin(uniqueValidator);  //Search uniquq faster and already exist

module.exports = mongoose.model('Customer',customerSchema);



