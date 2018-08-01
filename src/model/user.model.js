import mongoose from 'mongoose';
import Joi from 'joi'

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
      lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      },
      location: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255
      },
      role: {
        type: String,
        default:'user'
      },
      active: {
        type: Boolean,
        default:true
      },
},{ versionKey: false }, {collection : 'users'});

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