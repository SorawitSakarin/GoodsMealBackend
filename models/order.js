const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    name: { type: String, required: true },
    lineName: { type: String, required: true },
    message: { type: String, required: true },
    address: { type: String, required: true }, // "888/374 คอนโดเอ็มจตุจักร จอมพล จตุจักร กรุงเทพ"
    postalCode: { type: String, required: true },
    tel: { type: String, required: true },
  },

  amount: { type: String, required: true },  //ราคาขาย
  purchasedTime: { type: String, required: true }, //เวลาตอนจ่ายตัง
  orderedTime: { type: String, required: true }, // เวลาตอนกดสั่ง
  checkOutTime: { type: String, required: true }, // เวลาตอนกดใส่ตะกร้า
  startDeliveryDate:{type: String, required:true},   //วันที่เริ่มส่งอาหาร
  endDeliveryDate:{type: String, required:true}, // วันที่หยุดส่งอาหาร

  product: {
    name: { type: String, required: true },
    choiceOne: { type: String, required: true },
    choiceTwo: { type: String, required: true },
    skuId: { type: String, required: true },
  },

  discountCode: { type: String, required: true },
  discount: { type: String, required: true },
  price: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  shippedStatus: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  purchasedStatus: { type: String, required: true },
  orderNumber: { type: String, required: true },
  cancleReason: { type: String, required: true },

});

module.exports = mongoose.model("Order", orderSchema);
