import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student','Supervisor','Admin','Mentor','IndustryMentor'],
        required: true
    },
    profilePicture: {
        type: String,
        default:''
    },
    profileID: {
        type: Schema.Types.ObjectId,
        refPath: 'role'   
    },  
},{timestamps: true})

const User = models.User || model('User', userSchema);
export default User;
