const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventsSchema = new Schema({
  name:String,
  type:{type:String,enum:["Basic","Smoke","Weigth","fit"]},
  challenged: Array,
  inspectors: Array,
  objective:String,
  actualValue:String,
  rewards:Array,
  

 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Events = mongoose.model('Events', eventsSchema);
module.exports = Events;
