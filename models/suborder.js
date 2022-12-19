const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const suborderSchema = new Schema({
  calendar: { type: String, required: true },
  deliveryDate: { type: String, required: true },
  status:{type: String, required:true},      // created >> cooked >> AL >> complete
  
  createdTime:{type: String, required:true},
  cookedTime:{type: String, required:true},
  arealeaderTime:{type: String, required:true},
  completedTime:{type: String, required:true},

  menu: {
    id: { type: mongoose.Types.ObjectId, required: true },
    nameThai: { type: String, required: true },
    nameEng: { type: String, required: true },
    mainIngredient: { type: String, required: true },
    protein: { type: String, required: true },
    carb: { type: String, required: true },
    fat: { type: String, required: true },
    calorie: { type: String, required: true },
  },

  location:{
    id: { type: mongoose.Types.ObjectId, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
  },

  customer: {
    id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
  },

  dailyMenu: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "DailyMenu",
  },
});

module.exports = mongoose.model("SubOrder", suborderSchema);

// orderId: "gipaegjripfagpargpjp314",
//       package: "Package A",
//       menu: {
//         nameThai: "ข้าวผัดหมู",
//         nameEng: "Fried rice with pork",
//         mainIngredient: "Pork",
//         protein: "20",
//         carb: "100",
//         fat: "15",
//         calorie: "2000",
//       },
//       customer: {
//         customerName: "ต๊อป",
//         customerAddress: "M jattujak condo พหลโยธิน 18 จอมพล จตุจักร กทม 10900",
//       },
//       deliveryDate: "12/5/2022",
//       locationId: "NN1001",
//       locationName: "ลาดพร้าว",
