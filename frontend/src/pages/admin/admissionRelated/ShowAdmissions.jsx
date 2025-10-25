import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Chip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PageContainer from '../../../components/PageContainer';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import axios from 'axios';

const ShowAdmissions = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [admissionsList, setAdmissionsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdmissions();
    }, [currentUser._id]);

    const fetchAdmissions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/AdmissionList/${currentUser._id}`);
            if (response.data.message) {
                setAdmissionsList([]);
            } else {
                setAdmissionsList(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteHandler = async (deleteID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this admission?");
        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/Admission/${deleteID}`);
                fetchAdmissions();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteAllHandler = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all admissions?");
        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/Admissions/${currentUser._id}`);
                fetchAdmissions();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Approved': return 'success';
            case 'Rejected': return 'error';
            case 'Pending': return 'warning';
            default: return 'default';
        }
    };

    const admissionColumns = [
        { id: 'studentName', label: 'Student Name', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 100 },
        { id: 'phoneNumber', label: 'Phone', minWidth: 130 },
        { id: 'applicationDate', label: 'Application Date', minWidth: 130 },
        { id: 'applicationStatus', label: 'Status', minWidth: 100 },
    ];

    const admissionRows = admissionsList && admissionsList.length > 0 && admissionsList.map((admission) => {
        return {
            studentName: admission.studentName,
            sclassName: admission.sclassName?.sclassName || 'N/A',
            phoneNumber: admission.phoneNumber,
            applicationDate: new Date(admission.applicationDate).toLocaleDateString(),
            applicationStatus: (
                <Chip 
                    label={admission.applicationStatus} 
                    color={getStatusColor(admission.applicationStatus)}
                    size="small"
                />
            ),
            id: admission._id,
        };
    });

    const AdmissionButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                    onClick={() => navigate("/Admin/admissions/admission/" + row.id)}
                    size="small"
                    sx={{
                        color: '#8b5cf6',
                        '&:hover': { backgroundColor: 'rgba(139, 92, 246, 0.1)' }
                    }}
                >
                    <VisibilityIcon fontSize="small" />
                </IconButton>
                
                <IconButton 
                    onClick={() => deleteHandler(row.id)}
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
            icon: <PersonAddAlt1Icon color="primary" />, 
            name: 'Add New Admission',
            action: () => navigate("/Admin/admissions/add")
        },
        {
            icon: <DeleteIcon color="error" />, 
            name: 'Delete All Admissions',
            action: () => deleteAllHandler()
        },
    ];

    return (
        <>
            <PageContainer title="Admissions Management">
                {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">Loading...</Typography>
                    </Box>
                ) : admissionsList.length === 0 ? (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary" mb={3}>
                            No Admissions Found
                        </Typography>
                        <GreenButton 
                            variant="contained"
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/admissions/add")}
                        >
                            Add Admission
                        </GreenButton>
                    </Box>
                ) : (
                    Array.isArray(admissionsList) && admissionsList.length > 0 && (
                        <TableTemplate buttonHaver={AdmissionButtonHaver} columns={admissionColumns} rows={admissionRows} />
                    )
                )}
            </PageContainer>
            
            <SpeedDialTemplate actions={actions} />
        </>
    );
};

export default ShowAdmissions;

