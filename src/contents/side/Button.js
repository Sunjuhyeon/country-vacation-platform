import React, { useState } from 'react';
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
import {CircleBtn} from '../map/styled'

export default function Button({ cityName }) {
  const [isCityBtnVisible, setIsCityBtnisible] = useState(false);

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

  const toggleCityBtnVisibility = () => {
    setIsCityBtnisible(!isCityBtnVisible);
  }

  return (
    <div className={`btn_wrap ${isCityBtnVisible ? 'show' : ''}`}>
      {/* <Link to='/test'>테스트</Link> */}
      <CircleBtn>
        <Link to="/" className="home_btn">
          <i>전국 지도 보기</i>
        </Link>
      </CircleBtn>
      <CircleBtn>
        <button
          type="button"
          className={`ground_btn ${isCityBtnVisible ? 'on' : ''}`}
          onClick={toggleCityBtnVisibility}
        >
          <i>지역별</i>
        </button>
      </CircleBtn>
      {isCityBtnVisible && (
        <ul className={`city_btn_wrap`}>
          <li>
            <Link to={`/allMap/${cityName}`} state={{ cityName: v }}>
              지역 전체
            </Link>
          </li>
          {selectedCityLocations.map((city, index) => {
            return (
              <li>
                <Link
                  to={`/detailMap/${city.name}`}
                  state={{
                    cityName: city.name,
                    cityState: city.location,
                    stateName: cityName,
                  }}
                  key={index}
                  className={`list-item ${isCityBtnVisible ? 'show' : ''}`}
                >
                  {city.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
