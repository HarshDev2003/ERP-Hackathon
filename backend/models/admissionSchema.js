const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    previousSchool: {
        type: String
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    applicationStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    admissionDate: {
        type: Date
    },
    documents: [{
        documentName: String,
        documentUrl: String
    }],
    remarks: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("admission", admissionSchema);

