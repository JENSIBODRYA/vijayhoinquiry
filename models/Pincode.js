// models/Inquiry.js
const mongoose = require("mongoose");

const PincodeSchema = new mongoose.Schema({
  pincode: { type: Number, required: true, unique: true },
});

const Pincode = mongoose.model("Pincode", PincodeSchema);

module.exports = Pincode;
