"use client";
import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import SearchForm from './SearchForm';
import DateRangePicker from './DateRange';
import CampaignTable from './CampaignTable';
import { Campaign, DateRange, CampaignsContainerProps } from '../types';

const CampaignsContainer: React.FC<CampaignsContainerProps> = ({ initialCampaigns }) => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  const handleSearch = (query: string) => {
    console.log(query)
  };

  const handleDateRangeSelect = (range: DateRange) => {
    console.log(range)
    // TODO: Logic to filter campaigns by date range
    // TODO: Update campaigns state accordingly
  };

  const addCampaigns = (newCampaigns: Campaign[]) => {
    setCampaigns((prevCampaigns) => [...prevCampaigns, ...newCampaigns]);
  };

  return (
    <>
       <AppBar position="static">
        <Toolbar sx={{ textAlign: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Campaign Management
          </Typography>
          <SearchForm onSearch={handleSearch} />
          <DateRangePicker onSelectRange={handleDateRangeSelect} />
        </Toolbar>
      </AppBar>
      <CampaignTable campaigns={campaigns} />
    </>
  );
};

export default CampaignsContainer;