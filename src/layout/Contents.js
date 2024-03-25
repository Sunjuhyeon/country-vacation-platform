import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Map from '../contents/Map'
import Gangwon from '../contents/detail/Gangwon';

export default function Contents(props) {
  const gangwonData = props.data.filter(
    item => item.ctprvnNm === '강원특별자치도'
  );
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map data={props.data} />} />
        <Route path="/gangwon" element={<Gangwon data={gangwonData} />} />
      </Routes>
    </div>
  );
}
