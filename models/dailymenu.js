const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyMenuSchema = new Schema({
    deliveryDate: {type:String, required:true},
    calendar: {type:String, required:true},
    menuName: {type:String, required:true},
    menuId: {type: mongoose.Types.ObjectId, required: true},
    supplierId: {type: mongoose.Types.ObjectId, required: true},
    amount: {type: Number, required: true},
});

module.exports = mongoose.model('DailyMenu',dailyMenuSchema);
