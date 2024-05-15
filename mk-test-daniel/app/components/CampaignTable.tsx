"use client";
// CampaignTable.tsx
import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Campaign } from './../types'

interface CampaignTableProps {
  campaigns: Campaign[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  return (
    <TableContainer component={Paper}>
      <Container maxWidth="md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Active Status</TableCell>
              <TableCell>Budget (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.startDate}</TableCell>
                <TableCell>{campaign.endDate}</TableCell>
                <TableCell>{isActive(campaign.startDate, campaign.endDate) ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>${campaign.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </TableContainer>
  );
};

// Function to determine if a campaign is active based on start and end dates
const isActive = (startDate: string, endDate: string): boolean => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return today >= start && today <= end;
};

export default CampaignTable;
