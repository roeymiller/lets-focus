const Meeting = require("../models/Meeting");
const participants = require("../models/Participant");
const User = require("../models/user");
const fs = require("fs");
const db = require("../server/index");
const { timeStamp } = require("console");
const { isValidObjectId } = require("mongoose");

const createMeeting = async (req, res) => {
  const { name, hostId, time, date ,zoomLink} = req.body;
  const id = Date.now().toString;
  const link = "../meeting/".concat(id);
  const meeting = new Meeting({
    name,
    hostId,
    time,
    date,
    link,
    id,
    zoomLink,
  });
  if (!meeting) {
    return res.status(400).json({
      success: false,
      error: "You must provide all of the meeting features",
    });
  }

  //meeting.link='http://localhost:3002/api/meeting'.concat(_id);

  meeting
    .save(
      (meeting.link = "http://localhost:3002/api/meeting".concat(meeting._id))
    )
    .then(() => {
      return res.status(201).json({
        success: true,
        id: meeting._id,
        message: "Meeting created!",
        // link: 'http://localhost:3002/api/meeting'.concat(meeting._id),
      });
    })
    .catch((error) => {
      //   console.log(error.message);
      return res.status(400).json({
        400: "400",
        error,
        message: error.message,
      });
    });
  //meeting.link = 'http://localhost:3002/api/meeting'.concat(_id);


};

const createMeetingData=  async (nameID)=>{
     ///
     const url0 = 'http://localhost:3002/api/participants'
     const p = {
       name:"nameID",
     }
     axios.post(url0,p)
     .then(res=>{
       if(res.status==201){
         console.log(res.data);
       }
     })
     .catch(err=>{
       console.log("failed DATA" + err);
     });

}

const getMeetingByHostId = async (req, res) => {
  Meeting.find({ hostId: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error:", error);
    });
};

const updateMeeting = async (req, res) => {
  const updateMeeting = await Meeting.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      time: req.body.time,
      date: req.body.date,
    },
    { useFindAndModify: true, new: true }
  );
  if (updateMeeting) {
    res.json({ message: "updated" });
  }
};

const deleteMeeting = async (req, res) => {

  await Meeting.findOneAndDelete({ _id: req.params.id }, (err, meeting) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!meeting) {
      return res
        .status(404)
        .json({ success: false, error: `Meeting not found` });
    }

    return res.status(200).json({ success: true, data: meeting });
  }).catch((err) => console.log(err));
};

const getMeetingById = async (req, res) => {

  await Meeting.findOne({ _id: req.params.id }, (err, meeting) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!meeting) {
      return res
        .status(404)
        .json({ success: false, error: `Meeting not found` });
    }
    return res.status(200).json({ success: true, data: meeting });
  }).catch((err) => console.log(err));
};

const getHostIDByMeetingID = async (req, res) => {
  await Meeting.findOne({ _id: req.params.id }, (err, meeting) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!meeting) {
      return res
        .status(404)
        .json({ success: false, error: `Meeting not found` });
    }
    return res.status(200).json({ success: true, data: meeting.hostId });
  }).catch((err) => console.log(err));
};

const getMeetings = async (req, res, next) => {
  participants.find().then((meetings) => {
    if (meetings) {
      // console.log(meetings);
      res.status(200).json(meetings);
    } else {
      res.status(404).json({ message: "Meetings not found!" });
    }
  });
};

const addParticipant = async (req, res)=>{

//   await Meeting.findOneAndUpdate(
//     {'_id': req.params.id, 'participantsArray._id': '60b29dd548694a14b176f710'},
// {'participantsArray.$.name': "YAY0"}  ,    { useFindAndModify: true, new: true }
// )

if(req.body.p){
  await Meeting.findOneAndUpdate(
    {'_id': req.params.id, 'participantsArray.participantId': req.body.participantId},
  {'participantsArray.$.focus': req.body.focus}  ,    { useFindAndModify: true, new: true })
  .then(p=> res.status(200).json(p))

} else{
  await Meeting.findByIdAndUpdate(
    req.params.id,{ $addToSet : { participantsArray: {'participantId': req.body.participantId,'focus': req.body.focus}}},
    )
    .then(p=> res.status(200).json(p))

}

 
}


const updateParticipantFocus = async (req, res)=>{
    await Meeting.findOneAndUpdate(
    {'_id': req.body.meetingId, 'participantsArray._id': req.body.participantId},
{'participantsArray.$.focus': req.body.focus}  ,    { useFindAndModify: true, new: true })
.then(p=> res.status(200).json(p))

}

// 66x.hlw3wgeu
const deleteParticipant = async (req, res) => {
  await Meeting.findOneAndUpdate(
    {'_id': req.params.id, 'participantsArray.participantId': req.body.participantId},
  {$pull: {'participantsArray.$.participantId': req.body.participantId}} , { useFindAndModify: true, new: true })
  .then(p=> res.status(200).json(p))

};

module.exports = {
  createMeeting,
  updateMeeting,
  deleteMeeting,
  getMeetingById,
  getMeetings,
  getMeetingByHostId,
  getHostIDByMeetingID,
  addParticipant,
  createMeetingData,
  updateParticipantFocus,
  deleteParticipant,
};
