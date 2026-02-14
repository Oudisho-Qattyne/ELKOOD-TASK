import { useState, useEffect } from 'react';

interface TimeAgoProps {
  date: string | Date;
  className?: string;
  refreshInterval?: number; 
}

const TimeAgo = ({ 
  date, 
  className = '', 
  refreshInterval = 60000,
}: TimeAgoProps) => {
  const [displayText, setDisplayText] = useState('');

  const formatDateTimeShort = (date: Date): string => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    const options: Intl.DateTimeFormatOptions = isToday
      ? { hour: '2-digit', minute: '2-digit' }
      : { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        };
    
    return date.toLocaleString('en-US', options);
  };

  const calculateDisplay = (): string => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 0) {
      return 'in the future';
    }

    
    if (diffInSeconds < 3600) {
      const intervals = [
        { label: 'second', seconds: 1 },
        { label: 'minute', seconds: 60 },
      ];
      
      
      for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
          if (interval.seconds === 1) {
            return `${count} second${count !== 1 ? 's' : ''} ago`;
          } else {
            return `${count} minute${count !== 1 ? 's' : ''} ago`;
          }
        }
      }
      return 'just now';
    } else {
      
      return formatDateTimeShort(past);
    }
  };

  useEffect(() => {
    setDisplayText(calculateDisplay());

    if (refreshInterval > 0) {
      const intervalId = setInterval(() => {
        setDisplayText(calculateDisplay());
      }, refreshInterval);

      return () => clearInterval(intervalId);
    }
  }, [date, refreshInterval]);

  return (
    <span className={className} title={new Date(date).toLocaleString()}>
      {displayText}
    </span>
  );
};

export default TimeAgo;