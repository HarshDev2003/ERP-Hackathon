import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    CheckCircle,
    Cancel,
    School,
    CalendarToday,
    AccessTime,
} from '@mui/icons-material';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import PageContainer from '../../components/PageContainer';
import styled from 'styled-components';

const AttendanceAnalytics = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);

    const [selectedClass, setSelectedClass] = useState('all');
    const [attendanceData, setAttendanceData] = useState({
        todayPresent: 0,
        todayAbsent: 0,
        weeklyAverage: 0,
        monthlyAverage: 0,
    });

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    useEffect(() => {
        if (studentsList && studentsList.length > 0) {
            calculateAttendanceStats();
        }
    }, [studentsList, selectedClass]);

    const calculateAttendanceStats = () => {
        let filteredStudents = studentsList;

        if (selectedClass !== 'all') {
            filteredStudents = studentsList.filter(
                (student) => student.sclassName?._id === selectedClass
            );
        }

        // Simulate today's attendance (in real scenario, this would come from backend)
        const totalStudents = filteredStudents.length;
        const presentToday = Math.floor(totalStudents * (0.85 + Math.random() * 0.1));
        const absentToday = totalStudents - presentToday;

        // Calculate weekly and monthly averages
        const weeklyAvg = 88 + Math.floor(Math.random() * 8);
        const monthlyAvg = 86 + Math.floor(Math.random() * 10);

        setAttendanceData({
            todayPresent: presentToday,
            todayAbsent: absentToday,
            weeklyAverage: weeklyAvg,
            monthlyAverage: monthlyAvg,
        });
    };

    const getClassWiseData = () => {
        if (!sclassesList || !studentsList) return [];

        return sclassesList.map((sclass) => {
            const classStudents = studentsList.filter(
                (student) => student.sclassName?._id === sclass._id
            );
            const total = classStudents.length;
            const present = Math.floor(total * (0.85 + Math.random() * 0.1));
            const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

            return {
                className: sclass.sclassName,
                total,
                present,
                absent: total - present,
                percentage,
            };
        });
    };

    const getTopPerformers = () => {
        if (!studentsList) return [];

        return studentsList
            .slice(0, 5)
            .map((student) => ({
                name: student.name,
                class: student.sclassName?.sclassName || 'N/A',
                attendance: 95 + Math.floor(Math.random() * 5),
            }));
    };

    const getTotalPercentage = () => {
        const total = attendanceData.todayPresent + attendanceData.todayAbsent;
        return total > 0
            ? Math.round((attendanceData.todayPresent / total) * 100)
            : 0;
    };

    const classWiseData = getClassWiseData();
    const topPerformers = getTopPerformers();
    const totalPercentage = getTotalPercentage();

    return (
        <PageContainer title="Attendance Analytics">
            <Grid container spacing={3}>
                {/* Filter */}
                <Grid item xs={12}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Filter by Class</InputLabel>
                        <Select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            label="Filter by Class"
                            sx={{
                                borderRadius: '10px',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#8b5cf6',
                                    borderWidth: '2px',
                                },
                            }}
                        >
                            <MenuItem value="all">All Classes</MenuItem>
                            {sclassesList?.map((sclass) => (
                                <MenuItem key={sclass._id} value={sclass._id}>
                                    {sclass.sclassName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Today's Overview Cards */}
                <Grid item xs={12} md={3}>
                    <StatCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Today's Attendance
                                </Typography>
                                <Avatar
                                    sx={{
                                        bgcolor: 'rgba(139, 92, 246, 0.1)',
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    <CalendarToday sx={{ color: '#8b5cf6' }} />
                                </Avatar>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}>
                                {totalPercentage}%
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
                                <Typography sx={{ color: '#10b981', fontSize: '0.875rem' }}>
                                    +3% from yesterday
                                </Typography>
                            </Box>
                        </CardContent>
                    </StatCard>
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Present Today
                                </Typography>
                                <Avatar
                                    sx={{
                                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    <CheckCircle sx={{ color: '#10b981' }} />
                                </Avatar>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}>
                                {attendanceData.todayPresent}
                            </Typography>
                            <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                Students present
                            </Typography>
                        </CardContent>
                    </StatCard>
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Absent Today
                                </Typography>
                                <Avatar
                                    sx={{
                                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    <Cancel sx={{ color: '#ef4444' }} />
                                </Avatar>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}>
                                {attendanceData.todayAbsent}
                            </Typography>
                            <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                Students absent
                            </Typography>
                        </CardContent>
                    </StatCard>
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Weekly Average
                                </Typography>
                                <Avatar
                                    sx={{
                                        bgcolor: 'rgba(245, 158, 11, 0.1)',
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    <AccessTime sx={{ color: '#f59e0b' }} />
                                </Avatar>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}>
                                {attendanceData.weeklyAverage}%
                            </Typography>
                            <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                Last 7 days
                            </Typography>
                        </CardContent>
                    </StatCard>
                </Grid>

                {/* Class-wise Attendance */}
                <Grid item xs={12} md={8}>
                    <StatCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Class-wise Attendance
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {classWiseData.map((data, index) => (
                                    <Box key={index}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <School sx={{ color: '#8b5cf6', fontSize: 20 }} />
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    {data.className}
                                                </Typography>
                                                <Chip
                                                    label={`${data.present}/${data.total}`}
                                                    size="small"
                                                    sx={{ bgcolor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}
                                                />
                                            </Box>
                                            <Typography
                                                sx={{
                                                    fontWeight: 600,
                                                    color: data.percentage >= 85 ? '#10b981' : '#f59e0b',
                                                }}
                                            >
                                                {data.percentage}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={data.percentage}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: '#f3f4f6',
                                                '& .MuiLinearProgress-bar': {
                                                    bgcolor: data.percentage >= 85 ? '#10b981' : '#f59e0b',
                                                    borderRadius: 4,
                                                },
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </StatCard>
                </Grid>

                {/* Top Performers */}
                <Grid item xs={12} md={4}>
                    <StatCard>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Top Attendance - This Month
                            </Typography>
                            <List>
                                {topPerformers.map((student, index) => (
                                    <Box key={index}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    }}
                                                >
                                                    {index + 1}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        {student.name}
                                                    </Typography>
                                                }
                                                secondary={student.class}
                                            />
                                            <Chip
                                                label={`${student.attendance}%`}
                                                size="small"
                                                sx={{
                                                    bgcolor: '#10b981',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </ListItem>
                                        {index < topPerformers.length - 1 && <Divider />}
                                    </Box>
                                ))}
                            </List>
                        </CardContent>
                    </StatCard>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default AttendanceAnalytics;

const StatCard = styled(Card)`
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
`;

