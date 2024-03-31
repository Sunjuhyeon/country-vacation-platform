import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ location, all }) {
  return (
    <div className="btn_wrap">
      <div className="city_btn_wrap">
        <Link to={`/allMap/${all}`}>전체</Link>
        {location.map((city, index) => {
          return (
            <Link
              to={`/detailMap/${city}`}
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
