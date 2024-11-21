import React from 'react'
import Card from '../Components/Card';
import SchoolPerformance from '../Components/SchoolPerformance'


const Dashboard = () => {
  const cardsData = [
    {
      icon: 'student',
      title: 'Number of students:',
      number: 950,
    },
    {
      icon: 'teacher',
      title: 'Number of teachers:',
      number: 50,
    },
    {
      icon: 'attendance',
      title: 'Average attendance:',
      number: '89%',
    }
  ];
  return (
    <>
    <div className="card-container">
      {cardsData.map((card, index) => (
        <Card key={index} icon={card.icon} title={card.title} number={card.number} />
      ))}
    </div>
        <SchoolPerformance/>
    </>          
  );
}

export default Dashboard