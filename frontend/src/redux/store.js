import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import { admissionReducer } from './admissionRelated/admissionSlice';
import { feeReducer } from './feeRelated/feeSlice';
import { hostelReducer } from './hostelRelated/hostelSlice';
import { examReducer } from './examRelated/examSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
        admission: admissionReducer,
        fee: feeReducer,
        hostel: hostelReducer,
        exam: examReducer
    },
});

export default store;
