// routes/inquiryRoutes.js
const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");

router.post("/inquiries", inquiryController.createInquiry);
router.get("/inquiries", inquiryController.getInquiries);
router.put("/inquiries/:id", inquiryController.updateInquiry);
router.delete("/inquiries/:id", inquiryController.deleteInquiry);
router.get(
  "/perticularinquiries/:id",
  inquiryController.getPerticularInquiries
);

module.exports = router;
