const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    nameThai: {type:String, required:true},
    nameEng: {type:String, required:true},
    mainIngredient: {type:String, required:true},
    protein: {type:String, required:true},
    carb: {type:String, required:true},
    fat: {type:String, required:true},
    calorie: {type:String, required:true},
    cost: {type:String, required:true},
    supplierId: {type: mongoose.Types.ObjectId, required: true},
    supplierName: {type:String, required:true},
});

module.exports = mongoose.model('Menu',menuSchema);
