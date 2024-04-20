import { ImageFileType, Role } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
    firstLogin: {
        type: Boolean,
        default: false
    },
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
        enum: Object.values(Role),
        required: true
    },
    profileImage: {
        image: {
            type: String,
        },
        extension: {
            type: String,
            enum: Object.values(ImageFileType),
        }
    },
    profileID: {
        type: Schema.Types.ObjectId,
        refPath: 'role'   
    },
    activated: {
        type: Boolean,
        default: true
    }  
},{timestamps: true})

const User = models.User || model('User', userSchema);
export default User;
