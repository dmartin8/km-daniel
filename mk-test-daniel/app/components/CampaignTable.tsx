"use client";
import React from 'react';
import { Container } from '@mui/material';
import { Campaign } from './../types'
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

interface CampaignTableProps {
  campaigns: Campaign[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const rows = campaigns.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    isActive: isActive(campaign.startDate, campaign.endDate),
    budget: campaign.budget,
  }));

  const columns: any = [
		{
			field: 'name',
			headerName: 'Name',
      width: 150,
      renderCell: (params: any) => { 
        return (<strong>{params.row.name}</strong>);
      }
		},
		{
			field: 'startDate',
			headerName: 'Start Date',
      width: 170,
		},
		{
			field: 'endDate',
			headerName: 'End Date',
      width: 170,
		},
		{
      field: 'isActive',
      headerName: 'Status',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Chip className='ms-2'
          label={params.value ? "Active" : "Inactive"}
          color={params.value ? "success" : "error"}
          variant="outlined"
        />
      ),
    },
		{
			field: 'budget',
			headerName: 'Budget (USD)',
      width: 200,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params: any) => (
        <span>
          $ {parseFloat(params.row.budget).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      )
		}
	]
  return (
    <Container maxWidth="md" style={{ height: 700 }} className='mt-4'>
      <DataGrid rows={rows} columns={columns} autoPageSize />
    </Container>
  );
};

// condition to show active or inactive
const isActive = (startDate: string, endDate: string): boolean => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return today >= start && today <= end;
};

export default CampaignTable;
