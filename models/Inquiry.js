// models/Inquiry.js
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  description: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
});

inquirySchema.plugin(mongoosePaginate);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
