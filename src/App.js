import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contents from './layout/Contents';
import './assets/css/genaral.css';

export default function App() {
  const URL = 'http://api.data.go.kr/openapi/tn_pubr_public_frhl_exprn_vilage_api';

  const [data, setData] = useState(null); // API로 받은 데이터를 저장할 상태

  const fetchDataByProvince = async province => {
    try {
      const encodedApiKey = process.env.REACT_APP_API_KEY;
      const decodedApiKey = decodeURIComponent(encodedApiKey);

      const response = await axios.get(URL, {
        params: {
          serviceKey: decodedApiKey,
          pageNo: 1,
          numOfRows: 500,
          type: 'json',
          ctprvnNm: province,
        },
      });

      // API 응답에서 'items'가 없는 경우 빈 배열 반환
      return response.data?.response?.body?.items || [];
    } catch (error) {
      console.error('에러 : ', error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const provinces = [
        '경기도',
        '전북특별자치도',
        '전라남도',
        '광주광역시',
        '인천광역시',
        '강원특별자치도',
        '제주특별자치도',
        '대전광역시',
        '대구광역시',
        '세종특별자치시',
        '울산광역시',
        '부산광역시',
        '충청남도',
        '충청북도',
        '경상남도',
        '경상북도',
      ];

      const storedData = sessionStorage.getItem('cacheData');
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        const dataByProvince = await Promise.all(provinces.map(fetchDataByProvince));
        const flattenedData = dataByProvince.flat();
        setData(flattenedData);

        sessionStorage.setItem('cacheData', JSON.stringify(flattenedData));
      }
    } catch (error) {
      console.error('에러발생', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data && <Contents data={data} />}
    </div>
  );
}