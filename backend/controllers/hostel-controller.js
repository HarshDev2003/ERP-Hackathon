const Hostel = require('../models/hostelSchema.js');

const hostelCreate = async (req, res) => {
    try {
        const hostel = new Hostel({
            ...req.body,
            school: req.body.adminID
        });

        const result = await hostel.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const hostelList = async (req, res) => {
    try {
        const hostels = await Hostel.find({ school: req.params.id });
        
        if (hostels.length > 0) {
            res.send(hostels);
        } else {
            res.send({ message: "No hostels found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getHostelDetail = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id)
            .populate('rooms.students', 'name rollNum');
        
        if (hostel) {
            res.send(hostel);
        } else {
            res.send({ message: "No hostel found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateHostel = async (req, res) => {
    try {
        const result = await Hostel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const addRoom = async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);
        
        if (!hostel) {
            return res.send({ message: "Hostel not found" });
        }

        hostel.rooms.push(req.body);
        const result = await hostel.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const allocateRoom = async (req, res) => {
    try {
        const { studentId, roomNumber } = req.body;
        const hostel = await Hostel.findById(req.params.id);
        
        if (!hostel) {
            return res.send({ message: "Hostel not found" });
        }

        const room = hostel.rooms.find(r => r.roomNumber === roomNumber);
        
        if (!room) {
            return res.send({ message: "Room not found" });
        }

        if (room.occupiedBeds >= room.capacity) {
            return res.send({ message: "Room is full" });
        }

        room.students.push(studentId);
        room.occupiedBeds += 1;

        const result = await hostel.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deallocateRoom = async (req, res) => {
    try {
        const { studentId, roomNumber } = req.body;
        const hostel = await Hostel.findById(req.params.id);
        
        if (!hostel) {
            return res.send({ message: "Hostel not found" });
        }

        const room = hostel.rooms.find(r => r.roomNumber === roomNumber);
        
        if (!room) {
            return res.send({ message: "Room not found" });
        }

        room.students = room.students.filter(s => s.toString() !== studentId);
        room.occupiedBeds = Math.max(0, room.occupiedBeds - 1);

        const result = await hostel.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteHostel = async (req, res) => {
    try {
        const result = await Hostel.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteHostels = async (req, res) => {
    try {
        const result = await Hostel.deleteMany({ school: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No hostels found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    hostelCreate,
    hostelList,
    getHostelDetail,
    updateHostel,
    addRoom,
    allocateRoom,
    deallocateRoom,
    deleteHostel,
    deleteHostels
};

