import React from 'react';
import moment from 'moment';

function ElapsedTime({ date }) {
  const now = moment();
  const duration = moment.duration(now.diff(date));

  const days = duration.asDays();
  const hours = duration.asHours() % 24;
  const minutes = duration.asMinutes() % 60;

  return (
    <span>
      {Math.floor(days)} days {Math.floor(hours)} hours {Math.floor(minutes)} minutes
    </span>
  );
}

export default ElapsedTime;
