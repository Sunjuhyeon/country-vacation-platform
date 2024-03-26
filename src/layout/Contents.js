import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Map from '../contents/CityMap'
import GangwonMap from '../contents/map/GangwonMap';
import GangwonList from '../contents/list/GangwonList';

export default function Contents(props) {
  const gangwonData = props.data.filter(
    item => item.ctprvnNm === '강원특별자치도'
  );
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map data={props.data} />} />
        <Route path="/gangwonMap" element={<GangwonMap data={gangwonData} />} />
        <Route path="/gangwonList" element={<GangwonList data={gangwonData} />} />
      </Routes>
    </div>
  );
}
