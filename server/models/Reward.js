const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rewardSchema = new Schema({
  name:String,
  goal:String,
  text: String,
  imgPath:{type:String, default:"https://res.cloudinary.com/aaronreina/image/upload/v1551637407/ToTheTop/fireworks.jpg"},
  surprise: {type:Boolean, default:false},
  locked: {type:Boolean, default:true},
  done: {type:Boolean, default:false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Reward = mongoose.model('Rewards', rewardSchema);
module.exports = Reward;