import React from 'react'
import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SpeedDialTemplate = ({ actions }) => {
    return (
        <CustomSpeedDial
            ariaLabel="Quick actions"
            icon={<AddIcon />}
            direction="up"
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                    sx={{
                        '& .MuiSpeedDialAction-fab': {
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            '&:hover': {
                                backgroundColor: '#f9fafb',
                            }
                        }
                    }}
                />
            ))}
        </CustomSpeedDial>
    )
}

export default SpeedDialTemplate

const CustomSpeedDial = styled(SpeedDial)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  
  .MuiSpeedDial-fab {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    width: 56px;
    height: 56px;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
    
    &:hover {
      background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
      box-shadow: 0 12px 32px rgba(139, 92, 246, 0.5);
    }
    
    .MuiSvgIcon-root {
      color: #ffffff;
    }
  }
`;
