const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
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
    feeType: {
        type: String,
        enum: ['Tuition', 'Transport', 'Hostel', 'Library', 'Sports', 'Exam', 'Other'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,
        required: true
    },
    paymentDate: {
        type: Date
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Partial', 'Paid', 'Overdue'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'Bank Transfer', 'Cheque', 'Online'],
    },
    transactionId: {
        type: String
    },
    remarks: {
        type: String
    },
    academicYear: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        enum: ['First', 'Second', 'Annual']
    }
}, { timestamps: true });

module.exports = mongoose.model("fee", feeSchema);

