import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData, dataSelector} from './reducer/dataReducer'
import Contents from './layout/Contents';
import './assets/css/genaral.css';

export default function App() {
  const dispatch = useDispatch();
  const {isLoading, isError, data} = useSelector(dataSelector);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <i>
          <span className="hide_txt">로딩중입니다</span>
        </i>
      </div>
    ); // 로딩 중이면 로딩 메시지를 표시합니다.
  }

  if (isError) {
    return <div>Error occurred.</div>; // 에러가 발생하면 에러 메시지를 표시합니다.
  }

  return (
    <div>
      {data && <Contents data={data} />}
    </div>
  );
}