import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Box, IconButton, Typography
} from '@mui/material';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GreenButton, LightPurpleButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TableTemplate from '../../../components/TableTemplate';
import PageContainer from '../../../components/PageContainer';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);

        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            dispatch(deleteUser(deleteID, address)).then(() => {
                dispatch(getAllTeachers(currentUser._id));
            });
        }
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 170 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList && teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || 'Not Assigned',
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
            hasSubject: !!teacher.teachSubject?.subName,
        };
    });

    const TeacherButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                    onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                    size="small"
                    sx={{
                        color: '#8b5cf6',
                        '&:hover': { backgroundColor: 'rgba(139, 92, 246, 0.1)' }
                    }}
                >
                    <VisibilityIcon fontSize="small" />
                </IconButton>
                
                <IconButton 
                    onClick={() => deleteHandler(row.id, "Teacher")}
                    size="small"
                    sx={{
                        color: '#ef4444',
                        '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
                    }}
                >
                    <PersonRemoveIcon fontSize="small" />
                </IconButton>
                
                {!row.hasSubject && (
                    <LightPurpleButton
                        size="small"
                        onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}
                        sx={{ fontSize: '0.75rem', padding: '4px 12px' }}
                    >
                        Assign Subject
                    </LightPurpleButton>
                )}
            </Box>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    return (
        <>
            <PageContainer title="Teachers Management">
                {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">Loading...</Typography>
                    </Box>
                ) : response ? (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary" mb={3}>
                            No Teachers Found
                        </Typography>
                        <GreenButton 
                            variant="contained"
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/teachers/chooseclass")}
                        >
                            Add Teacher
                        </GreenButton>
                    </Box>
                ) : (
                    Array.isArray(rows) && rows.length > 0 && (
                        <TableTemplate buttonHaver={TeacherButtonHaver} columns={columns} rows={rows} />
                    )
                )}
            </PageContainer>
            
            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowTeachers