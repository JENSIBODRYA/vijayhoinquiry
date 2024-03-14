// controllers/inquiryController.js
const Pincode = require("../models/Pincode");

exports.createPincode = async (req, res) => {
  try {
    const inquiry = await Pincode.create(req.body);
    res.status(201).json({ success: true, data: inquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};