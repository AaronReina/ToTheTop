const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventsSchema = new Schema(
  {
    name: String,
    type: { type: String, default:false, enum: ["Basic", "Smoke", "Weigth", "fit"] },
    privated: [{type:Schema.Types.ObjectId, ref:"User"}] ,
    challenged: {type:Schema.Types.ObjectId, ref:"User"} ,
    inspectors: [{type:Schema.Types.ObjectId, ref:"User"}] ,
    imgPath:{type:String, default:"https://res.cloudinary.com/aaronreina/image/upload/v1550519673/ToTheTop/noimage.png"},
    objective: String,
    actualValue: String,
    rewards:[{type:Schema.Types.ObjectId, ref:"Rewards"}] ,
    timeOut:{type:Number, default:0}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Events = mongoose.model("Events", eventsSchema);
module.exports = Events;
