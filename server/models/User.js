const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  nik: String,
  imgPath:{type:String, default:"https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/userDefault.png"},
  invitations: Array,
  challenged: Array,
  inspectors: Array,
  active:{type:Boolean,default:false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;