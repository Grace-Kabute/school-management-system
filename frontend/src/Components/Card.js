import React from 'react';
import Icon from '../Components/Icon';

const Card = ({ title, number, icon }) => {
  return (
    <div className="card">
      <div className="icon">
        <Icon name={icon}/>
      </div>
      <h3>{title}</h3>
      <h2>{number}</h2>
    </div>
  );
};

export default Card;
