// controllers/inquiryController.js
const Inquiry = require("../models/Inquiry");

exports.createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, data: inquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {

    const { fromDate, toDate, mobile, page, limit } = req.query;
    const filters = {};
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    if (mobile !== undefined && mobile !== null && mobile !== "") {
      filters.mobileNumber = { $regex: new RegExp(mobile, 'i') };
    }

    if (fromDate && toDate && fromDate !== undefined && fromDate !== null && fromDate !== "" && toDate !== undefined && toDate !== null && toDate !== "") {
      filters.appointmentDate = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    if (Object.keys(filters).length === 0) {
      const inquiries = await Inquiry.paginate({}, options);
      return res.status(200).json({ success: true, data: inquiries });
    }

    const query = Inquiry.paginate(filters, options);
    const inquiries = await query;

    res.status(200).json({ success: true, data: inquiries });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getPerticularInquiries = async (req, res) => {
  try {
    const inquiryId = req.params.id;

    if (inquiryId) {
      const inquiry = await Inquiry.findById(inquiryId);
      if (!inquiry) {
        res.status(400).json({ success: false, data: "Inquiry not found" });
      } else {
        res.status(200).json({ success: true, data: inquiry });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
};

exports.updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params, " i m calling req.params")
    const updatedInquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatedInquiry, " i m calling from api")

    if (!updatedInquiry) {
      return res
        .status(404)
        .json({ success: false, error: "Inquiry not found" });
    }

    res.status(200).json({ success: true, data: updatedInquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInquiry = await Inquiry.findByIdAndRemove(id);

    if (!deletedInquiry) {
      return res
        .status(404)
        .json({ success: false, error: "Inquiry not found" });
    }

    res.status(200).json({ success: true, data: deletedInquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
