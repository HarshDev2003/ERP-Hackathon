import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import QuizIcon from '@mui/icons-material/Quiz';
import { useSelector } from 'react-redux';

const listItemStyles = {
    mb: 0.5,
    mx: 1,
    borderRadius: 2,
    transition: 'all 0.3s ease',
    '&:hover': { transform: 'translateX(4px)' }
};

const NavItem = ({ item }) => {
    const location = useLocation();
    const isActive = item.activePaths ? item.activePaths.includes(location.pathname) : location.pathname.startsWith(item.to);
    const iconColor = isActive ? (item.isLogout ? '#ef4444' : '#8b5cf6') : '#6b7280';
    const textColor = isActive ? (item.isLogout ? '#ef4444' : '#374151') : '#374151';
    const hoverBg = item.isLogout ? 'rgba(239, 68, 68, 0.1)' : 'rgba(139, 92, 246, 0.1)';

    return (
        <Tooltip title={item.text} placement="right" arrow>
            <ListItemButton component={Link} to={item.to} sx={{ ...listItemStyles, '&:hover': { ...listItemStyles['&:hover'], backgroundColor: hoverBg } }}>
                <ListItemIcon>
                    {React.cloneElement(item.icon, { sx: { color: iconColor } })}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: textColor, fontWeight: isActive ? 600 : 400 }} />
            </ListItemButton>
        </Tooltip>
    );
};

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser?.teachSclass?.sclassName || ''

    const mainItems = [
        { text: 'Home', to: '/', icon: <HomeIcon />, activePaths: ['/', '/Teacher/dashboard'] },
        { text: 'Students', to: '/Teacher/students', icon: <PeopleIcon /> },
        { text: 'Subjects', to: '/Teacher/subjects', icon: <MenuBookIcon /> },
        { text: 'Class', to: '/Teacher/class', icon: <ClassOutlinedIcon /> },
        { text: 'Notices', to: '/Teacher/notices', icon: <NotificationsActiveIcon /> },
        { text: 'Complain', to: '/Teacher/complain', icon: <AnnouncementOutlinedIcon /> },
        { text: 'Exams', to: '/Teacher/exams', icon: <QuizIcon /> },
    ];

    const userItems = [
        { text: 'Profile', to: '/Teacher/profile', icon: <AccountCircleOutlinedIcon /> },
        { text: 'Logout', to: '/logout', icon: <ExitToAppIcon />, isLogout: true },
    ];

    return (
        <>
            <React.Fragment>
                {mainItems.map((item) => <NavItem key={item.text} item={item} />)}
            </React.Fragment>
            <Divider sx={{ my: 2, mx: 2, backgroundColor: '#e5e7eb' }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{ color: '#8b5cf6', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: 'transparent' }}>
                    User
                </ListSubheader>
                {userItems.map((item) => <NavItem key={item.text} item={item} />)}
            </React.Fragment>
        </>
    )
}

export default TeacherSideBar
