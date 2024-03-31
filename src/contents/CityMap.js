import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// styled-component
const Circle = styled.div`
  width: ${({ size }) => `${Math.min(Math.max((size / 40) * 20, 40), 80)}px`};
  height: ${({ size }) => `${Math.min(Math.max((size / 40) * 20, 40), 80)}px`};
  border-radius: 50%;
  background-color: #fff;
  outline: 4px solid green;
  display:flex;
  justify-content:center;
  align-items:center;
`;
const IcoNm = styled.span`
  font-size: ${({ size }) =>
    `${Math.min(Math.max((size / 30) * 5, 20), 32)}px`};
`;

export default function Map(props) {
  const [listState, setListState] = useState([]);
  const [countState, setCountState] = useState([]);

  // 데이터에서 지역명 변경
  const modifiedData = props.data.map(v => {
    if (v.ctprvnNm == '전북특별자치도') {
      return { ...v, ctprvnNm: '전라북도' };
    }
    if (v.ctprvnNm == '광주광역시') {
      return { ...v, ctprvnNm: '전라남도' };
    }
    if (v.ctprvnNm == '인천광역시') {
      return { ...v, ctprvnNm: '인천' };
    }
    if (v.ctprvnNm == '대구광역시') {
      return { ...v, ctprvnNm: '대구' };
    }
    if (v.ctprvnNm == '강원특별자치도') {
      return { ...v, ctprvnNm: '강원도' };
    }
    if (v.ctprvnNm == '제주특별자치도') {
      return { ...v, ctprvnNm: '제주도' };
    }
    if (v.ctprvnNm == '대전광역시' || v.ctprvnNm == '세종특별자치시') {
      return { ...v, ctprvnNm: '대전·세종' };
    }
    if (v.ctprvnNm == '울산광역시' || v.ctprvnNm == '부산광역시') {
      return { ...v, ctprvnNm: '울산·부산' };
    }

    return v;
  });

  useEffect(() => {
    const stateCounts = {};
    const stateList = [];

    modifiedData.forEach(state => {
      const stateName = state.ctprvnNm;
      stateCounts[stateName] = (stateCounts[stateName] || 0) + 1;
      if (!stateList.includes(stateName)) {
        stateList.push(stateName);
      }
    });

    setCountState(stateCounts);
    setListState(stateList);

    console.log(props.data);
  }, [props.data]);

  return (
    <div className="inner">
      <div className="map_wrap">
        <img
          className="map_img"
          src={require(`../assets/images/img/map1.png`)}
          alt="지도"
        />
        <div className="state_wrap">
          <ul className="state_list">
            {listState.map((v, i) => {
              console.log(v)
              return (
                <li key={i} className={`${v}`}>
                  <Link to={`/allMap/${v}`} state={{ cityName : v }}>
                    <p>{v}</p>
                    <Circle size={countState[v]}>
                      <IcoNm size={countState[v]}>{countState[v]}</IcoNm>
                    </Circle>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
