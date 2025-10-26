import { Container, Grid, Paper, Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
                    Dashboard Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Welcome back! Here's what's happening in your school today.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Students Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <GradientCard gradient="linear-gradient(135deg, #3c53a8ff 0%, #161892ff)">
                        <CardContent sx={{ position: 'relative', height: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', mb: 1 }}>
                                        Total Students
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                                        <CountUp start={0} end={numberOfStudents} duration={2.5} />
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <TrendingUpIcon sx={{ fontSize: 16, color: '#4ade80' }} />
                                        <Typography sx={{ color: '#4ade80', fontSize: '0.75rem' }}>
                                            +12% from last month
                                        </Typography>
                                    </Box>
                                </Box>
                                <IconWrapper bgcolor="rgba(255,255,255,0.2)">
                                    <SchoolIcon sx={{ color: 'white' }} />
                                </IconWrapper>
                            </Box>
                        </CardContent>
                    </GradientCard>
                </Grid>

                {/* Classes Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <GradientCard gradient="linear-gradient(135deg, #3c53a8ff 0%, #161892ff)">
                        <CardContent sx={{ position: 'relative', height: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', mb: 1 }}>
                                        Total Classes
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                                        <CountUp start={0} end={numberOfClasses} duration={2.5} />
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <TrendingUpIcon sx={{ fontSize: 16, color: '#4ade80' }} />
                                        <Typography sx={{ color: '#4ade80', fontSize: '0.75rem' }}>
                                            +5% from last month
                                        </Typography>
                                    </Box>
                                </Box>
                                <IconWrapper bgcolor="rgba(255,255,255,0.2)">
                                    <ClassIcon sx={{ color: 'white' }} />
                                </IconWrapper>
                            </Box>
                        </CardContent>
                    </GradientCard>
                </Grid>

                {/* Teachers Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <GradientCard gradient="linear-gradient(135deg, #3c53a8ff 0%, #161892ff)">
                        <CardContent sx={{ position: 'relative', height: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', mb: 1 }}>
                                        Total Teachers
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                                        <CountUp start={0} end={numberOfTeachers} duration={2.5} />
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <TrendingUpIcon sx={{ fontSize: 16, color: '#4ade80' }} />
                                        <Typography sx={{ color: '#4ade80', fontSize: '0.75rem' }}>
                                            +8% from last month
                                        </Typography>
                                    </Box>
                                </Box>
                                <IconWrapper bgcolor="rgba(255,255,255,0.2)">
                                    <PeopleIcon sx={{ color: 'white' }} />
                                </IconWrapper>
                            </Box>
                        </CardContent>
                    </GradientCard>
                </Grid>

                {/* Fees Card */}
                <Grid item xs={12} sm={6} md={3}>
                    <GradientCard gradient="linear-gradient(135deg, #3c53a8ff 0%, #161892ff)">
                        <CardContent sx={{ position: 'relative', height: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', mb: 1 }}>
                                        Fees Collection
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                                        $<CountUp start={0} end={23000} duration={2.5} separator="," />
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <TrendingUpIcon sx={{ fontSize: 16, color: '#4ade80' }} />
                                        <Typography sx={{ color: '#4ade80', fontSize: '0.75rem' }}>
                                            +15% from last month
                                        </Typography>
                                    </Box>
                                </Box>
                                <IconWrapper bgcolor="rgba(255,255,255,0.2)">
                                    <PaymentIcon sx={{ color: 'white' }} />
                                </IconWrapper>
                            </Box>
                        </CardContent>
                    </GradientCard>
                </Grid>

                {/* Notices Section */}
                <Grid item xs={12}>
                    <ModernPaper elevation={0}>
                        <SeeNotice />
                    </ModernPaper>
                </Grid>
            </Grid>
        </Container>
    );
};


const GradientCard = styled(Card)`
  background: ${props => props.gradient};
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  height: 160px;
  border: none;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
`;

const IconWrapper = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgcolor};
`;

const ModernPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid #f0f0f0;
`;

export default AdminHomePage