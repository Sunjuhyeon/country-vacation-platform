import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gangwon,
  Gyeonggi,
  Incheon,
  Chungbuk,
  Chungnam,
  DaejeonSejong,
  Daegu,
  Gyeongbuk,
  Gyeongnam,
  UlsanBusan,
  Jeonbuk,
  Jeonnam,
  Jeju,
} from '../map/cityName';

export default function Button({ cityName }) {

  const cityLocation = {
    경기도: Gyeonggi,
    전라북도: Jeonbuk,
    전라남도: Jeonnam,
    인천: Incheon,
    강원도: Gangwon,
    제주도: Jeju,
    대전·세종: DaejeonSejong,
    대구: Daegu,
    울산·부산: UlsanBusan,
    충청남도: Chungnam,
    충청북도: Chungbuk,
    경상북도: Gyeongbuk,
    경상남도: Gyeongnam,
  };
  const selectedCityLocations = cityLocation[cityName];

  const v = cityName;

  return (
    <div className="btn_wrap">
      <div className="city_btn_wrap">
        <Link to={`/allMap/${cityName}`} state={{cityName:v}}>전체</Link>
        {selectedCityLocations.map((city, index) => {
          return (
            <Link
              to={`/detailMap/${city.name}`}
              state={{
                cityName: city.name,
                cityState: city.location,
                stateName: cityName,
              }}
              key={index}
            >
              {city.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
