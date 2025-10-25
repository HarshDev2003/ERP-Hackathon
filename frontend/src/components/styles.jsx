import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 240

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: theme.palette.common.white,
        fontWeight: 700,
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        padding: '18px 16px',
        borderBottom: 'none',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '18px 16px',
        borderBottom: '1px solid #e5e7eb',
        color: '#374151',
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#f9fafb',
    },
    '&:hover': {
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        transition: 'all 0.3s ease',
        transform: 'scale(1.001)',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    transition: 'all 0.3s ease',
}));

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.25)',
    backdropFilter: 'blur(10px)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            borderRight: '1px solid #e5e7eb',
            boxShadow: '4px 0 12px rgba(0,0,0,0.05)',
            background: '#ffffff',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
