"use client";
import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography, Container} from '@mui/material';
import SearchForm from './SearchForm';
import DateRangePicker from './DateRange';
import CampaignTable from './CampaignTable';
import { Campaign, DateRange, CampaignsContainerProps } from '../types';

const CampaignsContainer = () => {

  const [initialCampaigns, setInitialCampaigns] = useState<Campaign[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [queryState, setQuerySate] = useState('');
  const [rangeState, setRangeState] = useState<DateRange>(['', '']);

  // Function to add campaigns form browser console
  const addCampaigns  = (data: Campaign[]) => {
    setInitialCampaigns(prevCampaigns => [...prevCampaigns, ...data]); 
    setCampaigns(prevCampaigns => [...prevCampaigns, ...data]);
  };

  useEffect(() => {
    (window as any).addCampaigns = addCampaigns;
  }, []);

  const handleSearch = (query: string) => {
    setQuerySate(query)

    let filteredCampaigns = initialCampaigns;

    // Check if there is date range selected
    if (rangeState[0].length > 0 || rangeState[1].length > 0) {
      filteredCampaigns = filterByRange(rangeState);
    } 

    const searchedCampaigns = filteredCampaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(query.toLowerCase())
    );
    setCampaigns(searchedCampaigns);
  };

  const handleDateRangeSelect = (range: DateRange) => {
    setRangeState(range);

    let filteredCampaigns = filterByRange(range);

    if (queryState.length > 0 ) {
      filteredCampaigns = filteredCampaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(queryState.toLowerCase())
      );
    }

    setCampaigns(filteredCampaigns);
  };

  const filterByRange = (range: DateRange) => {
    const [startDate, endDate] = range;
    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date();

    let filteredCampaigns = initialCampaigns.filter(campaign => {
      const campaignStartDate = new Date(campaign.startDate);
      const campaignEndDate = new Date(campaign.endDate);
      return (campaignStartDate >= start && campaignStartDate <= end) ||
             (campaignEndDate >= start && campaignEndDate <= end);
    });
    return filteredCampaigns; 
  }

  return (
    <>
       <AppBar position="static">
        <Container maxWidth="md">
          <h4 className='mt-3 mb-3'>
            Campaign Management
          </h4>
          <div style={{ margin: '10px 20px 15px -25px' }}>
            <SearchForm onSearch={handleSearch} />
          </div>
        </Container>
      </AppBar>
      <Container maxWidth="md">
            <DateRangePicker onSelectRange={handleDateRangeSelect} />
      </Container>
      <CampaignTable campaigns={campaigns} />
    </>
  );
};

export default CampaignsContainer;