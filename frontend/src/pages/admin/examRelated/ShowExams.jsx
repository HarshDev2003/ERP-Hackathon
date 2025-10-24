import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Paper, Box, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
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
            <>
                <IconButton onClick={() => deleteHandler(row.id)}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate("/Admin/exams/exam/" + row.id)}>
                    View
                </BlueButton>
            </>
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
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {examsList.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/exams/add")}>
                                Add Exam
                            </GreenButton>
                        </Box>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(examsList) && examsList.length > 0 &&
                                <TableTemplate buttonHaver={ExamButtonHaver} columns={examColumns} rows={examRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    )}
                </>
            )}
        </>
    );
};

export default ShowExams;

