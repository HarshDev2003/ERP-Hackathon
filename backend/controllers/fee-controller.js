const Fee = require('../models/feeSchema.js');

const feeCreate = async (req, res) => {
    try {
        const fee = new Fee({
            ...req.body,
            school: req.body.adminID
        });

        const result = await fee.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const feeList = async (req, res) => {
    try {
        const fees = await Fee.find({ school: req.params.id })
            .populate('student', 'name rollNum')
            .populate('sclassName', 'sclassName')
            .sort({ dueDate: -1 });
        
        if (fees.length > 0) {
            res.send(fees);
        } else {
            res.send({ message: "No fees found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getStudentFees = async (req, res) => {
    try {
        const fees = await Fee.find({ student: req.params.id })
            .populate('sclassName', 'sclassName')
            .sort({ dueDate: -1 });
        
        if (fees.length > 0) {
            res.send(fees);
        } else {
            res.send({ message: "No fees found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getFeeDetail = async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id)
            .populate('student', 'name rollNum')
            .populate('sclassName', 'sclassName')
            .populate('school', 'schoolName');
        
        if (fee) {
            res.send(fee);
        } else {
            res.send({ message: "No fee found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateFee = async (req, res) => {
    try {
        const result = await Fee.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const payFee = async (req, res) => {
    try {
        const { amountPaid, paymentMethod, transactionId } = req.body;
        const fee = await Fee.findById(req.params.id);
        
        if (!fee) {
            return res.send({ message: "Fee not found" });
        }

        fee.amountPaid += amountPaid;
        fee.paymentDate = new Date();
        fee.paymentMethod = paymentMethod;
        fee.transactionId = transactionId;

        if (fee.amountPaid >= fee.amount) {
            fee.paymentStatus = 'Paid';
        } else if (fee.amountPaid > 0) {
            fee.paymentStatus = 'Partial';
        }

        const result = await fee.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteFee = async (req, res) => {
    try {
        const result = await Fee.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteFees = async (req, res) => {
    try {
        const result = await Fee.deleteMany({ school: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No fees found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    feeCreate,
    feeList,
    getStudentFees,
    getFeeDetail,
    updateFee,
    payFee,
    deleteFee,
    deleteFees
};

