import React from 'react';
import Chart from './Chart';

const SchoolPerformance = () => {
  const classData = [
    { className: 'Grade 10', average: 330 },
    { className: 'Grade 11', average: 257 },
    { className: 'Grade 12', average: 280 },
    { className: 'Grade 9', average: 158 },
    { className: 'Grade 8', average: 313 },
  ];

  return (
    <div>
      <Chart data={classData} />
    </div>
  );
};

export default SchoolPerformance;
