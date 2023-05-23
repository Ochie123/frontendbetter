import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const EndTime = styled('span')(({ theme }) => ({
  fontSize: '0.75em',
  color: '#323232',
  fontWeight: 300,
}));

const Subheading = styled('div')(({ theme }) => ({
  margin: '16px',
  color: theme.palette.openTitle,
}));

const calculateTimeLeft = (endTime) => {
  const difference = endTime - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      timeEnd: false,
    };
  } else {
    timeLeft = { timeEnd: true };
  }
  return timeLeft;
};

export default function Timer({ endTime, update }) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(endTime))
  );

  useEffect(() => {
    let timer = null;
    if (!timeLeft.timeEnd) {
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [endTime, timeLeft.timeEnd]);

  useEffect(() => {
    if (timeLeft.timeEnd) {
      update();
    }
  }, [timeLeft.timeEnd, update]);

  return (
    <Subheading>
      {!timeLeft.timeEnd ? (
        <Typography component="p" variant="h6">
          {timeLeft.days !== 0 && `${timeLeft.days} d `}
          {timeLeft.hours !== 0 && `${timeLeft.hours} h `}
          {timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
          {timeLeft.seconds !== 0 && `${timeLeft.seconds} s`} left{' '}
          <EndTime>{`(ends at ${endTime.toLocaleString()})`}</EndTime>
        </Typography>
      ) : (
        <Typography component="p" variant="h6">
          Auction ended
        </Typography>
      )}
    </Subheading>
  );
}
