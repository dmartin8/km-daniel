"use client";
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Chip from '@mui/material/Chip';

interface DateRangeProps {
  onSelectRange: (range: [string, string]) => void;
}

const DateRange: React.FC<DateRangeProps> = ({ onSelectRange }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [rangeChip, setRangeChip] = useState<Boolean>(false);

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
    onSelectRange([date ? date.format('MM/DD/YYYY') : '', endDate?  endDate.format('MM/DD/YYYY') : '']);
    setRangeChip(true)
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
    onSelectRange([startDate ? startDate.format('MM/DD/YYYY') : '', date ? date.format('MM/DD/YYYY') : '']);
    setRangeChip(true)
  };

  const handleDelete = () => {
    setStartDate(null);
    setEndDate(null);
    onSelectRange(['', '']);
    setRangeChip(false)
  };

  const generateLabel = () => {
    let label = 'Dates Filter';
    
    if (startDate && !endDate) {
      label =  'Campaigns since ' + startDate.format('MM/DD/YYYY');
    }
    if (!startDate && endDate) {
      label =  'Campaigns until ' + endDate.format('MM/DD/YYYY');
    }
    if (startDate && endDate) {
      label =  'Campaigns between ' + startDate.format('MM/DD/YYYY') + 'and' + endDate.format('MM/DD/YYYY') ;
    }
    return label;
  }
  return (
    <><div className='d-flex mt-4'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start"
          className='w-50 me-3'
          value={startDate}
          onChange={handleStartDateChange}
          maxDate={endDate || undefined} />
        <DatePicker
          label="End"
          className='ms-3 w-50'
          value={endDate}
          onChange={handleEndDateChange}
          minDate={startDate || undefined} />
      </LocalizationProvider>
    </div>
    {rangeChip && 
      (<Chip label={generateLabel()} className='mt-3' variant="outlined" onDelete={handleDelete} />)}
    </>

  );
};

export default DateRange;
