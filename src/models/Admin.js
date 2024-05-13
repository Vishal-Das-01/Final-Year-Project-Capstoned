import { Gender, ImageFileType } from '@/utils/constants/enums';
import { model, models, Schema } from 'mongoose';

const adminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(Gender),
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
}, { timestamps: true });

const Admin = models.Admin || model('Admin', adminSchema);
export default Admin;