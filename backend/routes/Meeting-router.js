const express = require("express");
// const upload = require("../middlewares/upload");
const MeetingCtrl = require("../controllers/Meeting-ctrl");
const Meeting = require("../models/Meeting");

const router = express.Router();

router.post("/meeting", MeetingCtrl.createMeeting);
router.post("/participants", MeetingCtrl.createMeetingData);
router.put("/updatemeeting/:id", MeetingCtrl.updateMeeting);
router.put("/addparticipant/:id", MeetingCtrl.addParticipant);
router.put("/updateparticipantfocus/:id", MeetingCtrl.updateParticipantFocus);
router.put("/deleteparticipant/:id", MeetingCtrl.deleteParticipant);
router.delete("/meeting/:id", MeetingCtrl.deleteMeeting);
router.get("/meeting/:id", MeetingCtrl.getMeetingById);
router.get("/meetings", MeetingCtrl.getMeetings);
router.get("/meets/:id", MeetingCtrl.getMeetingByHostId);
router.get("/meeting0/:id", MeetingCtrl.getHostIDByMeetingID);
// router.get("/MeetingList/groupBy", MeetingCtrl.groupBy);

module.exports = router;
