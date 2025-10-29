const bcrypt = require('bcrypt');
const Student = require('../models/studentSchema.js');
const Application = require('../models/studentApplicationSchema.js');

const createApplication = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const app = new Application({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      message: req.body.message,
      password: hashedPass,
    });

    const result = await app.save();
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const listPendingApplications = async (req, res) => {
  try {
    const apps = await Application.find({ status: 'pending' }).sort({ createdAt: -1 });
    if (!apps || apps.length === 0) return res.send({ message: 'No pending applications' });
    res.send(apps);
  } catch (err) {
    res.status(500).json(err);
  }
};

const approveApplication = async (req, res) => {
  try {
    const { sclassName, adminID, rollNum } = req.body;
    const app = await Application.findById(req.params.id);
    if (!app) return res.send({ message: 'Application not found' });

    // Create student using application data
    const student = new Student({
      name: app.name,
      rollNum,
      password: app.password,
      sclassName,
      school: adminID,
      role: 'Student',
      email: app.email,
      mobile: app.mobile,
    });

    const created = await student.save();
    await Application.findByIdAndUpdate(app._id, { status: 'approved' });

    created.password = undefined;
    res.send(created);
  } catch (err) {
    res.status(500).json(err);
  }
};

const rejectApplication = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.send(app);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createApplication, listPendingApplications, approveApplication, rejectApplication };
