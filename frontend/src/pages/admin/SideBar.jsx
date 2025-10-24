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
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: 'rgba(103, 126, 234, 0.08)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/classes"
                    sx={{
                        mb: 0.5,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: 'rgba(103, 126, 234, 0.08)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/teachers">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students">
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/notices">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/complains">
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Management
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/admissions">
                    <ListItemIcon>
                        <SchoolIcon color={location.pathname.startsWith('/Admin/admissions') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Admissions" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/fees">
                    <ListItemIcon>
                        <PaymentIcon color={location.pathname.startsWith('/Admin/fees') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Fee Management" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/hostels">
                    <ListItemIcon>
                        <HotelIcon color={location.pathname.startsWith('/Admin/hostels') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Hostel" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/exams">
                    <ListItemIcon>
                        <QuizIcon color={location.pathname.startsWith('/Admin/exams') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Exams" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBar
