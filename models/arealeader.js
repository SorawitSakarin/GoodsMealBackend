const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const arealeaderSchema = new Schema({
    
    status:{type: String},    //active unactive
    lineId:{type: String, required:true},
    lineName:{type: String, required:true},
    firstName:{type: String, required:true},
    lastName:{type: String, required:true},
    vehicle:{type: String, required:true},
    mainJob:{type: String, required:true},
    secJob:{type: String, required:true},
    salary:{type: String, required:true},
    sex:{type: String, required:true},
    dob:{type: String, required:true},
    tel:{type: String, required:true ,unique:true},   //unique ทำให้ค้นหาไวขึ้น
    location:{
        province:{type: String, required:true},
        district: {type: String, required:true},
        subDistrict:{type: String, required:true},
        postalCode:{type: String, required:true},
        address:{type: String, required:true},
        locationCode: { type: String, required:true, ref:'Location'}
    },
    

});


arealeaderSchema.plugin(uniqueValidator);  //Search uniquq faster and already exist

module.exports = mongoose.model('AreaLeader',arealeaderSchema);



