const Admission = require('../models/admissionSchema.js');

const admissionCreate = async (req, res) => {
    try {
        const admission = new Admission({
            ...req.body,
            school: req.body.adminID
        });

        const result = await admission.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const admissionList = async (req, res) => {
    try {
        const admissions = await Admission.find({ school: req.params.id })
            .populate('sclassName', 'sclassName')
            .sort({ applicationDate: -1 });
        
        if (admissions.length > 0) {
            res.send(admissions);
        } else {
            res.send({ message: "No admissions found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAdmissionDetail = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id)
            .populate('sclassName', 'sclassName')
            .populate('school', 'schoolName');
        
        if (admission) {
            res.send(admission);
        } else {
            res.send({ message: "No admission found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateAdmission = async (req, res) => {
    try {
        const result = await Admission.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteAdmission = async (req, res) => {
    try {
        const result = await Admission.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteAdmissions = async (req, res) => {
    try {
        const result = await Admission.deleteMany({ school: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No admissions found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    admissionCreate,
    admissionList,
    getAdmissionDetail,
    updateAdmission,
    deleteAdmission,
    deleteAdmissions
};

