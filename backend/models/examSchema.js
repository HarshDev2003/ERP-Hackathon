const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true
    },
    examType: {
        type: String,
        enum: ['Mid-term', 'Final', 'Unit Test', 'Quarterly', 'Half-yearly', 'Annual'],
        required: true
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
    academicYear: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    schedule: [{
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            required: true
        },
        examDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        totalMarks: {
            type: Number,
            required: true
        },
        passingMarks: {
            type: Number,
            required: true
        },
        room: {
            type: String
        }
    }],
    instructions: {
        type: String
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    }
}, { timestamps: true });

module.exports = mongoose.model("exam", examSchema);

