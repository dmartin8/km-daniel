"use client";
// DateRangePicker.tsx
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
interface DateRangeProps {
  onSelectRange: (range: [string, string]) => void;
}

const DateRange: React.FC<DateRangeProps> = ({ onSelectRange }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleStartDateChange = (date: Dayjs | null) => {
    console.log(date)
    setStartDate(date);
    onSelectRange([date ? date.format('MM/DD/YYYY') : '', endDate?  endDate.format('MM/DD/YYYY') : '']);
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
    onSelectRange([startDate ? startDate.format('MM/DD/YYYY') : '', date ? date.format('MM/DD/YYYY') : '']);
  };
  
  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    onSelectRange(['', '']);
  };
  return (
    <div className='d-flex mt-4 mb-3'>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker
          label="Start"
          className='w-50 me-3'
          value={startDate}
          onChange={handleStartDateChange}
          maxDate={endDate || undefined} 
        />
        <DatePicker
          label="End"
          className='ms-3 w-50'
          value={endDate}
          onChange={handleEndDateChange}
          minDate={startDate || undefined}
        />
      </LocalizationProvider>
    
    </div>
  );
};

export default DateRange;
