import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Box, IconButton, Chip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PageContainer from '../../../components/PageContainer';
import AddIcon from '@mui/icons-material/Add';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import axios from 'axios';

const ShowExams = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [examsList, setExamsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExams();
    }, [currentUser._id]);

    const fetchExams = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ExamList/${currentUser._id}`);
            if (response.data.message) {
                setExamsList([]);
            } else {
                setExamsList(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteHandler = async (deleteID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/Exam/${deleteID}`);
                fetchExams();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'success';
            case 'Ongoing': return 'info';
            case 'Scheduled': return 'warning';
            case 'Cancelled': return 'error';
            default: return 'default';
        }
    };

    const examColumns = [
        { id: 'examName', label: 'Exam Name', minWidth: 170 },
        { id: 'examType', label: 'Type', minWidth: 120 },
        { id: 'sclassName', label: 'Class', minWidth: 100 },
        { id: 'startDate', label: 'Start Date', minWidth: 120 },
        { id: 'endDate', label: 'End Date', minWidth: 120 },
        { id: 'status', label: 'Status', minWidth: 100 },
    ];

    const examRows = examsList && examsList.length > 0 && examsList.map((exam) => {
        return {
            examName: exam.examName,
            examType: exam.examType,
            sclassName: exam.sclassName?.sclassName || 'N/A',
            startDate: new Date(exam.startDate).toLocaleDateString(),
            endDate: new Date(exam.endDate).toLocaleDateString(),
            status: (
                <Chip 
                    label={exam.status} 
                    color={getStatusColor(exam.status)}
                    size="small"
                />
            ),
            id: exam._id,
        };
    });

    const ExamButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                    onClick={() => navigate("/Admin/exams/exam/" + row.id)}
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
            icon: <AddIcon color="primary" />, 
            name: 'Add New Exam',
            action: () => navigate("/Admin/exams/add")
        },
        {
            icon: <DeleteIcon color="error" />, 
            name: 'Delete All Exams',
            action: async () => {
                const confirmDelete = window.confirm("Are you sure you want to delete all exams?");
                if (confirmDelete) {
                    try {
                        await axios.delete(`${import.meta.env.VITE_BASE_URL}/Exams/${currentUser._id}`);
                        fetchExams();
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
    ];

    return (
        <>
            <PageContainer title="Exam Management">
                {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">Loading...</Typography>
                    </Box>
                ) : examsList.length === 0 ? (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary" mb={3}>
                            No Exams Found
                        </Typography>
                        <GreenButton 
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/Admin/exams/add")}
                        >
                            Add Exam
                        </GreenButton>
                    </Box>
                ) : (
                    Array.isArray(examsList) && examsList.length > 0 && (
                        <TableTemplate buttonHaver={ExamButtonHaver} columns={examColumns} rows={examRows} />
                    )
                )}
            </PageContainer>
            
            <SpeedDialTemplate actions={actions} />
        </>
    );
};

export default ShowExams;

