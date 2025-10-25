import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    margin-left: 4px;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    color: white;
    margin-left: 4px;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%);
    color: white;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(153, 27, 27, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(153, 27, 27, 0.4);
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #fff;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
    color: #fff;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
    color: #fff;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #fff;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #92400e 0%, #78350f 100%);
    color: white;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(146, 64, 14, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #a16207 0%, #92400e 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(146, 64, 14, 0.4);
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    border-radius: 10px;
    padding: 10px 24px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
    }
  }
`;
