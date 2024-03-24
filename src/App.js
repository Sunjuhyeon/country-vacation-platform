import React, { useEffect } from 'react';
import Contents from './layout/Contents';
import axios from 'axios';

import info from './data/info.json';
import './assets/css/genaral.css';

export default function App() {
  const URL = ' http://api.data.go.kr/openapi/tn_pubr_public_frhl_exprn_vilage_api';

  const fetchData = async () => {
    try{
      const encodedApiKey = process.env.REACT_APP_API_KEY;
      const decodedApiKey = decodeURIComponent(encodedApiKey);

      const response = await axios.get(URL, {
        params: {
          serviceKey: decodedApiKey,
          pageNo: 1,
          numOfRows: 100,
          type: 'json',
        },
      });
      console.log(response.data);
    }catch(error){
      console.error('에러 : ', error );
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [process.env.REACT_APP_API_KEY]);
  
  return (
    <div>
      <Contents info={info}/>
    </div>
  )
}

