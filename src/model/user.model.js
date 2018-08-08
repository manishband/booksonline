import mongoose from 'mongoose';
import Joi from 'joi'
import jwt from 'jsonwebtoken'
const Schema = mongoose.Schema;

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  role:{type:String,default:'user'},
  active:{type:Boolean,default:true},
  firstname:String,
  lastname:String,
  email:String,
  password:String
});

let UserModel = mongoose.model('users', UserSchema);

UserModel.getAll = () => {
    return UserModel.find({});
}

UserModel.generateAuthToken = function(id) {
  const token = jwt.sign({_id:id},'randonwordsdad');
  return token;
}

UserModel.removeUser = (userName) => {
    return UserModel.remove({name: userName});
}
UserModel.findEmail = (find) => {
    
  return UserModel.findOne(find);
}
UserModel.getUser = (id) => {
  return UserModel.find({'_id':id,active:true});
}

export default UserModel;