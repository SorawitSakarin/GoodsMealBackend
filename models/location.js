const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    
    lat:{type: String, required:true},
    lng:{type: String, required:true},
    province: {type: String, required:true},
    district: {type: String, required:true},
    subDistrict:{type: String, required:true},
    postalCode: {type: String, required:true},
    locationCode: {type: String, required:true},
    locationName:{type: String, required:true},
    address: {type: String, required:true},
    
    areaLeaders: [{type: mongoose.Types.ObjectId, required: true, ref:'AreaLeader'}],
    lastMile: [{type: mongoose.Types.ObjectId, required: true, ref:'LastMile'}],
    customers: [{type: mongoose.Types.ObjectId, required: true, ref:'Customer'}],

});



module.exports = mongoose.model('Location',locationSchema);



