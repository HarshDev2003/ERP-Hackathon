import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import styled from 'styled-components';

const PageContainer = ({ title, children, actions }) => {
  return (
    <StyledContainer maxWidth="lg">
      <HeaderBox>
        <PageTitle variant="h4">
          {title}
        </PageTitle>
        {actions && (
          <ActionsBox>
            {actions}
          </ActionsBox>
        )}
      </HeaderBox>
      <ContentBox>
        {children}
      </ContentBox>
    </StyledContainer>
  );
};

export default PageContainer;

const StyledContainer = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
  min-height: calc(100vh - 64px);
`;

const HeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const PageTitle = styled(Typography)`
  && {
    font-weight: 700;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 2rem;
  }
`;

const ActionsBox = styled(Box)`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ContentBox = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e7eb;
  }
`;

