import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Box, IconButton, Typography
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableTemplate from '../../../components/TableTemplate';
import PageContainer from '../../../components/PageContainer';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);

        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            dispatch(deleteUser(deleteID, address))
                .then(() => {
                    dispatch(getSubjectList(currentUser._id, "AllSubjects"));
                })
        }
    }

    const subjectColumns = [
        { id: 'subName', label: 'Sub Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                    onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
                    size="small"
                    sx={{
                        color: '#8b5cf6',
                        '&:hover': { backgroundColor: 'rgba(139, 92, 246, 0.1)' }
                    }}
                >
                    <VisibilityIcon fontSize="small" />
                </IconButton>
                
                <IconButton 
                    onClick={() => deleteHandler(row.id, "Subject")}
                    size="small"
                    sx={{
                        color: '#ef4444',
                        '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <>
            <PageContainer title="Subjects Management">
                {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">Loading...</Typography>
                    </Box>
                ) : response ? (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary" mb={3}>
                            No Subjects Found
                        </Typography>
                        <GreenButton 
                            variant="contained"
                            startIcon={<PostAddIcon />}
                            onClick={() => navigate("/Admin/subjects/chooseclass")}
                        >
                            Add Subjects
                        </GreenButton>
                    </Box>
                ) : (
                    Array.isArray(subjectsList) && subjectsList.length > 0 && (
                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                    )
                )}
            </PageContainer>
            
            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowSubjects;