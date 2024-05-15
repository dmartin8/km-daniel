"use client";
// DateRangePicker.tsx
import React, { useState } from 'react';

interface DateRangeProps {
  onSelectRange: (range: [string, string]) => void;
}

const DateRange: React.FC<DateRangeProps> = ({ onSelectRange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSelectRange([startDate, endDate]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={startDate} onChange={handleStartDateChange} />
      <input type="date" value={endDate} onChange={handleEndDateChange} />
      <button type="submit">Apply</button>
    </form>
  );
};

export default DateRange;
