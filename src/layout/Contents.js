import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Map from '../contents/CityMap'
import AllMap from '../contents/map/AllMap';
import DetailMap from '../contents/map/DetailMap';

export default function Contents(props) {
  const gangwonData = props.data.filter(
    item => item.ctprvnNm === '강원특별자치도'
  );
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map data={props.data} />} />
        <Route path="/allMap/:ctprvnNm" element={<AllMap data={props.data} />} />
        <Route path="/detailMap/:signguNm" element={<DetailMap data={props.data}/>}/>
      </Routes>
    </div>
  );
}
