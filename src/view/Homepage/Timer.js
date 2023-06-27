import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms"

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

  const formatTimeValue = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <Subheading>
      {!timeLeft.timeEnd ? (
        <Typography component="p" variant="h8">
          <AccessAlarmsIcon style={{ fontSize: 19, marginRight: '4px' }}/>
          {timeLeft.days !== 0 && `${formatTimeValue(timeLeft.days)}:`}
          {timeLeft.hours !== 0 && `${formatTimeValue(timeLeft.hours)}:`}
          {timeLeft.minutes !== 0 && `${formatTimeValue(timeLeft.minutes)}:`}
          {`${formatTimeValue(timeLeft.seconds)}`}
        </Typography>
      ) : (
        <Typography component="p" variant="h6">
          Auction ended
        </Typography>
      )}
    </Subheading>
  );
}