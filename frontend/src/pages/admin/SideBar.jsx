import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import PaymentIcon from '@mui/icons-material/Payment';
import HotelIcon from '@mui/icons-material/Hotel';
import QuizIcon from '@mui/icons-material/Quiz';

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton 
                    component={Link} 
                    to="/"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon sx={{ color: location.pathname === ("/" || "/Admin/dashboard") ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ color: location.pathname === ("/" || "/Admin/dashboard") ? '#8b5cf6' : '#374151', fontWeight: location.pathname === ("/" || "/Admin/dashboard") ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/classes"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <ClassOutlinedIcon sx={{ color: location.pathname.startsWith('/Admin/classes') ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" sx={{ color: location.pathname.startsWith('/Admin/classes') ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith('/Admin/classes') ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/subjects"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <AssignmentIcon sx={{ color: location.pathname.startsWith("/Admin/subjects") ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" sx={{ color: location.pathname.startsWith("/Admin/subjects") ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith("/Admin/subjects") ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/teachers"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon sx={{ color: location.pathname.startsWith("/Admin/teachers") ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" sx={{ color: location.pathname.startsWith("/Admin/teachers") ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith("/Admin/teachers") ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/students"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <PersonOutlineIcon sx={{ color: location.pathname.startsWith("/Admin/students") ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Students" sx={{ color: location.pathname.startsWith("/Admin/students") ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith("/Admin/students") ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/notices"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon sx={{ color: location.pathname.startsWith("/Admin/notices") ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" sx={{ color: location.pathname.startsWith("/Admin/notices") ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith("/Admin/notices") ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/complains"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <ReportIcon sx={{ color: location.pathname.startsWith("/Admin/complains") ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" sx={{ color: location.pathname.startsWith("/Admin/complains") ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith("/Admin/complains") ? 600 : 400 }} />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 2, mx: 2, backgroundColor: '#e5e7eb' }} />
            <React.Fragment>
                <ListSubheader 
                    component="div" 
                    inset
                    sx={{
                        color: '#8b5cf6',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    Management
                </ListSubheader>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/admissions"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <SchoolIcon sx={{ color: location.pathname.startsWith('/Admin/admissions') ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Admissions" sx={{ color: location.pathname.startsWith('/Admin/admissions') ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith('/Admin/admissions') ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/fees"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <PaymentIcon sx={{ color: location.pathname.startsWith('/Admin/fees') ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Fee Management" sx={{ color: location.pathname.startsWith('/Admin/fees') ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith('/Admin/fees') ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/hostels"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <HotelIcon sx={{ color: location.pathname.startsWith('/Admin/hostels') ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Hostel" sx={{ color: location.pathname.startsWith('/Admin/hostels') ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith('/Admin/hostels') ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/exams"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <QuizIcon sx={{ color: location.pathname.startsWith('/Admin/exams') ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Exams" sx={{ color: location.pathname.startsWith('/Admin/exams') ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith('/Admin/exams') ? 600 : 400 }} />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 2, mx: 2, backgroundColor: '#e5e7eb' }} />
            <React.Fragment>
                <ListSubheader 
                    component="div" 
                    inset
                    sx={{
                        color: '#8b5cf6',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    User
                </ListSubheader>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/profile"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon sx={{ color: location.pathname.startsWith("/Admin/profile") ? '#8b5cf6' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" sx={{ color: location.pathname.startsWith("/Admin/profile") ? '#8b5cf6' : '#374151', fontWeight: location.pathname.startsWith("/Admin/profile") ? 600 : 400 }} />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/logout"
                    sx={{
                        mb: 0.5,
                        mx: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            transform: 'translateX(4px)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <ExitToAppIcon sx={{ color: location.pathname.startsWith("/logout") ? '#ef4444' : '#6b7280' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ color: location.pathname.startsWith("/logout") ? '#ef4444' : '#374151', fontWeight: location.pathname.startsWith("/logout") ? 600 : 400 }} />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBar
