// ✅ COMPLETE FINAL FIXED FILE — ShowStudents.jsx

import { useEffect, useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";

import {
  Paper, Box, IconButton, Typography, Container, Button, ButtonGroup,
  ClickAwayListener, Grow, Popper, MenuItem, MenuList
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

import { BlackButton, BlueButton, GreenButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import PageContainer from "../../../components/PageContainer";
import Popup from "../../../components/Popup";

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  const deleteHandler = async (deleteID, address) => {
    setMessage("Deleting...");
    setShowPopup(true);

    await dispatch(deleteUser(deleteID, address));
    setMessage("Deleted successfully ✅");

    setTimeout(() => {
      dispatch(getAllStudents(currentUser._id));
    }, 700);
  };

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
    { id: "sclassName", label: "Class", minWidth: 170 },
  ];

  const studentRows =
    Array.isArray(studentsList) &&
    studentsList.map((s) => ({
      name: s.name,
      rollNum: s.rollNum,
      sclassName: s.sclassName?.sclassName || "N/A",
      id: s._id,
    }));

  const StudentButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
        <IconButton 
          onClick={() => navigate(`/Admin/students/student/${row.id}`)}
          size="small"
          sx={{
            color: '#8b5cf6',
            '&:hover': { backgroundColor: 'rgba(139, 92, 246, 0.1)' }
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>

        <IconButton 
          onClick={() => deleteHandler(row.id, "Student")}
          size="small"
          sx={{
            color: '#ef4444',
            '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
          }}
        >
          <PersonRemoveIcon fontSize="small" />
        </IconButton>

        <Fragment>
          <ButtonGroup variant="contained" size="small" ref={anchorRef}>
            <BlueButton
              size="small"
              onClick={() =>
                navigate(
                  selectedIndex === 0
                    ? `/Admin/students/student/attendance/${row.id}`
                    : `/Admin/students/student/marks/${row.id}`
                )
              }
              sx={{ fontSize: '0.75rem', padding: '4px 12px' }}
            >
              {options[selectedIndex]}
            </BlueButton>
            <BlueButton size="small" onClick={() => setOpen((o) => !o)} sx={{ padding: '4px 8px', minWidth: 'auto' }}>
              {open ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
            </BlueButton>
          </ButtonGroup>

          <Popper open={open} anchorEl={anchorRef.current} sx={{ zIndex: 1200 }} transition>
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <Paper elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <MenuList autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={() => {
                            setSelectedIndex(index);
                            setOpen(false);
                          }}
                          sx={{
                            fontSize: '0.875rem',
                            '&.Mui-selected': {
                              backgroundColor: 'rgba(139, 92, 246, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                              }
                            }
                          }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Fragment>
      </Box>
    );
  };

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Student",
      action: () => navigate("/Admin/addstudents"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Students",
      action: () => deleteHandler(currentUser._id, "Students"),
    },
  ];

  return (
    <>
      <PageContainer title="Students Management">
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">Loading...</Typography>
          </Box>
        ) : studentsList?.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary" mb={3}>
              No Students Found
            </Typography>
            <GreenButton onClick={() => navigate("/Admin/addstudents")} startIcon={<PersonAddAlt1Icon />}>
              Add Students
            </GreenButton>
          </Box>
        ) : (
          <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
        )}
      </PageContainer>
      
      <SpeedDialTemplate actions={actions} />
      <Popup message={message} showPopup={showPopup} setShowPopup={setShowPopup} />
    </>
  );
};

export default ShowStudents;
