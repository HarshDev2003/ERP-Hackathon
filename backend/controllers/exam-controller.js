const Exam = require('../models/examSchema.js');

const examCreate = async (req, res) => {
    try {
        const exam = new Exam({
            ...req.body,
            school: req.body.adminID
        });

        const result = await exam.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const examList = async (req, res) => {
    try {
        const exams = await Exam.find({ school: req.params.id })
            .populate('sclassName', 'sclassName')
            .populate('schedule.subject', 'subName')
            .sort({ startDate: -1 });
        
        if (exams.length > 0) {
            res.send(exams);
        } else {
            res.send({ message: "No exams found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getClassExams = async (req, res) => {
    try {
        const exams = await Exam.find({ sclassName: req.params.id })
            .populate('schedule.subject', 'subName')
            .sort({ startDate: -1 });
        
        if (exams.length > 0) {
            res.send(exams);
        } else {
            res.send({ message: "No exams found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getExamDetail = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id)
            .populate('sclassName', 'sclassName')
            .populate('schedule.subject', 'subName subCode')
            .populate('school', 'schoolName');
        
        if (exam) {
            res.send(exam);
        } else {
            res.send({ message: "No exam found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateExam = async (req, res) => {
    try {
        const result = await Exam.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const addSchedule = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        
        if (!exam) {
            return res.send({ message: "Exam not found" });
        }

        exam.schedule.push(req.body);
        const result = await exam.save();
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteExam = async (req, res) => {
    try {
        const result = await Exam.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteExams = async (req, res) => {
    try {
        const result = await Exam.deleteMany({ school: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No exams found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    examCreate,
    examList,
    getClassExams,
    getExamDetail,
    updateExam,
    addSchedule,
    deleteExam,
    deleteExams
};

