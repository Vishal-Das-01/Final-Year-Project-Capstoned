import { model, models, Schema } from 'mongoose';

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    webURL: {
        type: String
    },
    linkedinURL: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    affiliatedProjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    verified: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const Company = models.Company || model('Company', companySchema);
export default Company;
