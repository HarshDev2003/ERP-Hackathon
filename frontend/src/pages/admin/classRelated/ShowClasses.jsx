import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import PageContainer from '../../../components/PageContainer';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
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
          dispatch(getAllSclasses(adminID, "Sclass"));
        })
    }
  }

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ]

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  })

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
        <IconButton 
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
          size="small"
          sx={{
            color: '#8b5cf6',
            '&:hover': { backgroundColor: 'rgba(139, 92, 246, 0.1)' }
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
        
        <IconButton 
          onClick={() => deleteHandler(row.id, "Sclass")}
          size="small"
          sx={{
            color: '#ef4444',
            '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        
        <ActionMenu actions={actions} />
      </Box>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Tooltip title="More Actions">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              color: '#6b7280',
              '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.1)' }
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: '8px',
              mt: 1,
              minWidth: 180,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action, index) => (
            <MenuItem 
              key={index} 
              onClick={action.action}
              sx={{
                fontSize: '0.875rem',
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.08)'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <>
      <PageContainer title="Classes Management">
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">Loading...</Typography>
          </Box>
        ) : getresponse ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary" mb={3}>
              No Classes Found
            </Typography>
            <GreenButton 
              variant="contained" 
              startIcon={<AddCardIcon />}
              onClick={() => navigate("/Admin/addclass")}
            >
              Add Class
            </GreenButton>
          </Box>
        ) : (
          Array.isArray(sclassesList) && sclassesList.length > 0 && (
            <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
          )
        )}
      </PageContainer>
      
      <SpeedDialTemplate actions={actions} />
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;

