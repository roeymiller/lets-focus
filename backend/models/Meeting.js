const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema(
  {
    _id: false,
    participantId: Number,
    name: String,
    focus: Number,
  }
)

const Meeting = new Schema(
  {
    name: { type: String, required: false },
    hostId: {
      type: Schema.Types.String,
      ref: "User",
      required: false,
    },
    time: {
      type: String,
      // default: (time.getHours() + ":" + time.getMinutes()).toString(),
      required: false,
    },
    date: {
      type: String,
      // default:
      //    date.getFullYear() +
      //    "/" +
      //    (date.getMonth() + 1) +
      //    "/" +
      //    date.getDate().toString(),
      required: true,
    },
    link: { type: String, required: false },
    id: { type: String, required: false },
    participantsArray: {type: [{_id:false,participantId:String ,name:String, focus:Number}], required: false},
    zoomLink: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("meetings", Meeting);
