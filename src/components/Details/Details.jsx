import React from 'react';

const Details = ({ place, title, title2, description }) => {
  return (
    <div className="details">
      <div className="place-box">
        <div className="text">{place}</div>
      </div>
      <div className="title-1">{title}</div>
      <div className="title-2">{title2}</div>
      <div className="desc">{description}</div>
    </div>
  );
};

export default Details;
