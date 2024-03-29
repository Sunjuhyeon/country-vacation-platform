import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({cityName}) {
  return (
    <div className="btn_wrap">
      <div className="city_btn_wrap">
        <Link to='/gangwonMap'>전체</Link>
        {cityName.map((city, index) => {
          return (
            <Link
              to={`/gangwonDetail/${city}`}
              state={{ cityName: city }}
              key={index}
            >
              {city}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
