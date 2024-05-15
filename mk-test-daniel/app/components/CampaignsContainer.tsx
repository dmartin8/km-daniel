"use client";
import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography, Container} from '@mui/material';
import SearchForm from './SearchForm';
import DateRangePicker from './DateRange';
import CampaignTable from './CampaignTable';
import { Campaign, DateRange, CampaignsContainerProps } from '../types';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
const CampaignsContainer = () => {

  const [initialCampaigns, setInitialCampaigns] = useState<Campaign[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [query, setQuery] = useState('');
  // Range flag is to control if the campaigns are already filtered by the range selector
  const [rangeFlag, setRangeFlag] = useState(false);

  // Function to add campaigns form browser console
  const addCampaigns  = (data: Campaign[]) => {
    setInitialCampaigns(prevCampaigns => [...prevCampaigns, ...data]); 
    setCampaigns(prevCampaigns => [...prevCampaigns, ...data]);
  };

  useEffect(() => {
    (window as any).addCampaigns = addCampaigns;
  }, []);

  const handleSearch = (query: string) => {
    const searchedCampaigns = (rangeFlag ? campaigns : initialCampaigns).filter((campaign) =>
      campaign.name.toLowerCase().includes(query.toLowerCase())
    );
    setCampaigns(searchedCampaigns);
  };

  const handleDateRangeSelect = (range: DateRange) => {
    const [startDate, endDate] = range;
    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date();

    setRangeFlag(true);

    const filteredCampaigns = (query.length > 0 ? campaigns : initialCampaigns).filter(campaign => {
      const campaignStartDate = new Date(campaign.startDate);
      const campaignEndDate = new Date(campaign.endDate);
      return (campaignStartDate >= start && campaignStartDate <= end) ||
             (campaignEndDate >= start && campaignEndDate <= end);
    });
    setCampaigns(filteredCampaigns);
  };

  // const handleClearFilters = () => {
  //   setQuery('');
  //   setRangeFlag(false);
  //   setCampaigns(initialCampaigns);
  // };
  return (
    <>
       <AppBar position="static">
        <Container maxWidth="md">
          <h4 className='mt-3 mb-3'>
            Campaign Management
          </h4>
          <div style={{ display: 'flex', margin: '10px 20px 15px -25px' }}>
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