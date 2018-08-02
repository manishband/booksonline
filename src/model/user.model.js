import mongoose from 'mongoose';
import Joi from 'joi'
const Schema = mongoose.Schema;

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  role:String,
  active:Boolean,
  firstname:String,
  lastname:String,
  email:String,
  password:String
});

let UserModel = mongoose.model('users', UserSchema);

UserModel.getAll = () => {
    return UserModel.find({});
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