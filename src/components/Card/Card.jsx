import React from 'react';

const Card = ({ place, title, title2, description, image }) => {
  return (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
      <div className="card-content">
        <div className="content-start"></div>
        <div className="content-place">{place}</div>
        <div className="content-title-1">{title}</div>
        <div className="content-title-2">{title2}</div>
      </div>
    </div>
  );
};

export default Card;
