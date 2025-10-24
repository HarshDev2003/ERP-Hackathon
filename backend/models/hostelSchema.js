const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    hostelType: {
        type: String,
        enum: ['Boys', 'Girls'],
        required: true
    },
    totalRooms: {
        type: Number,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    warden: {
        name: String,
        phone: String,
        email: String
    },
    rooms: [{
        roomNumber: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        occupiedBeds: {
            type: Number,
            default: 0
        },
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student'
        }],
        roomType: {
            type: String,
            enum: ['Single', 'Double', 'Triple', 'Quad'],
            required: true
        },
        floor: {
            type: Number,
            required: true
        }
    }],
    facilities: [{
        type: String
    }],
    feePerSemester: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("hostel", hostelSchema);

