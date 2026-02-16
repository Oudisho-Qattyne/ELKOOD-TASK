import { useState, useEffect } from 'react';

interface TimeAgoProps {
  date: string | Date;
  className?: string;
  refreshInterval?: number;
}

const TimeAgo = ({ date, className = '' }: TimeAgoProps) => {
  const [formattedDate, setFormattedDate] = useState('');

  const formatDate = (inputDate: string | Date): string => {
    const d = new Date(inputDate);
    if (isNaN(d.getTime())) return 'Invalid date';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');

    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    setFormattedDate(formatDate(date));
  }, [date]);

  return (
    <span className={className} title={new Date(date).toLocaleString()}>
      {formattedDate}
    </span>
  );
};

export default TimeAgo;