import React, { useEffect, useState } from 'react';
import {InfoBox} from './styled'
// import styled from 'styled-components';
import {
  Map,
  MapMarker,
  CustomOverlayMap
} from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import ImgMap1 from '../../assets/images/ico/map_cate1.png';
import ImgMap2 from '../../assets/images/ico/map_cate2.png';
import ImgMap3 from '../../assets/images/ico/map_cate3.png';
import ImgMap4 from '../../assets/images/ico/map_cate4.png';
import ImgMap5 from '../../assets/images/ico/map_cate5.png';
import Button from '../side/Button';

const MemoizeGangwon = React.memo(Gangwon);

export default function MemoizeGangwonComponent(props){
  return <MemoizeGangwon {...props}/>
}

//filteredCity를 위한 지역명 변수
const cityName = [
  '원주시',
  '춘천시',
  '강릉시',
  '동해시',
  '속초시',
  '삼척시',
  '태백시',
  '홍천군',
  '철원군',
  '횡성군',
  '평창군',
  '정선군',
  '영월군',
  '인제군',
  '고성군',
  '양양군',
  '화천군',
  '양구군',
];
function Gangwon(props) {
  useKakaoLoader();
  
  const [isOpen, setIsOpen] = useState(false); //커스텀오버레이 관리
  const [filteredCategory, setFilteredCategory] = useState(null); //체험프로그램 구분 관리
  const [filteredCity, setFilteredCity] = useState(null); //시군구명 관리
  const [mapCenter, setMapCenter] = useState({lat: 37.8304115, lng: 128.2260705}); //중심좌표 관리

  // const filteredData = {};
  // cityName.forEach(city => {
  //   filteredData[city] = props.data.filter(item => item.signguNm === city);
  // });
  useEffect(() => {
    console.log(props.data)

    if(props.data && props.data.length > 0){
      setIsOpen(new Array(props.data.length).fill(false));
    }
  }, [props.data]);

  const toggleMarker = (index, position) => {
   setIsOpen(prevState => {
    const newState = prevState.map((state, i) => i === index ? !state : false);
    return newState;
   });
   setMapCenter(position)
  }

  // 카테고리 필터링 함수
  // const handleCategoryFilter = category => {
  //   console.log('필터링 된 카테고리 : ', category)
  //   setFilteredCategory(category);
  // };
  // 지역 필터링 함수
  // const handleCityFilter = city => {
  //   console.log('필터링된 지역 :', city)
  //   setFilteredCity(city);
  // };

  // 체험프로그램 +로 나누어 첫번째 단어로 구분
  const getCategory = (exprnSe) => {
    if(!exprnSe) return '농촌체험';
    const categorries = exprnSe.split('+');
    return categorries[0] === '기타' ? '농촌체험' : categorries[0];
  }

  // 카테고리 필터링 이미지_이미지 매핑 객체 생성
  const categoryImage = {
    '농작물경작체험': ImgMap1,
    '만들기체험' : ImgMap2,
    '전통문화체험' : ImgMap3,
    '건강' : ImgMap4,
    '농촌체험' : ImgMap5
  };
  
  // 이미지 매핑 함수
  const getCategoryImage = (category) => {
    return categoryImage[category] || ImgMap5;
  };

  useEffect(() => {
    console.log('mapCenter:', mapCenter);
  }, [mapCenter]);

  return (
    <div className="map_inner">
      <Button cityName={cityName} />
      <div>
        <Map // 지도를 표시할 Container
          id="map"
          center={mapCenter}
          isPanto={true}
          style={{
            // 지도의 크기
            width: '100vw',
            height: '100vh',
          }}
          level={11} // 지도의 확대 레벨
        >
          {props.data &&
            props.data.map((position, index) => {
              const lat =
                position && position.latitude ? position.latitude : null;
              const lng =
                position && position.longitude ? position.longitude : null;
              const category = getCategory(position.exprnSe);
              const city =
                position && position.signguNm ? position.signguNm : null;
              //카테고리 필터링
              if (
                (filteredCategory && category !== filteredCategory) ||
                (filteredCity && city !== filteredCity)
              ) {
                return null;
              }
              return (
                <div>
                  <MapMarker
                    position={{ lat: lat, lng: lng }}
                    image={{
                      src: getCategoryImage(category), // 마커이미지의 주소입니다
                      size: {
                        width: 30,
                        height: 30,
                      }, // 마커이미지의 크기입니다
                    }}
                    clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                    onClick={() => toggleMarker(index, { lat, lng })}
                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    category={category}
                    city={city}
                  ></MapMarker>
                  {isOpen[index] && (
                    <CustomOverlayMap
                      position={{ lat: lat, lng: lng }}
                      yAnchor={1.15} // 마커와의 간격을 조정할 수 있다
                    >
                      <InfoBox>
                        <div className="info_overlay">
                          <div className="info_list">
                            <p className={`info_cate ${category}`}>
                              {category}
                            </p>
                            <p className="info_title">
                              {position.exprnVilageNm}
                            </p>
                            <ul className="info_act">
                              {position.exprnCn
                                .split('+')
                                .slice(0, 3)
                                .map((item, idx) => {
                                  return (
                                    <li className={`act${idx}`}>{item}</li>
                                  );
                                })}
                            </ul>
                            <ul className="info_contact">
                              {position.rdnmadr && (
                                <li className="contact1">
                                  <p>{position.rdnmadr}</p>
                                </li>
                              )}
                              {position.phoneNumber && (
                                <li className="contact2">
                                  <p>{position.phoneNumber}</p>
                                </li>
                              )}
                              {position.homepageUrl && (
                                <li className="contact3">
                                  <a
                                    href={position.homepageUrl}
                                    target="_blank"
                                  >
                                    {position.homepageUrl}
                                  </a>
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="map_link">
                            <span>길찾기</span>
                            <a
                              href={`https://map.kakao.com/link/to/${position.exprnVilageNm},${lat},${lng}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              길찾기
                            </a>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleMarker(index, { lat, lng })}
                          className="close_btn"
                        >
                          close
                        </button>
                      </InfoBox>
                    </CustomOverlayMap>
                  )}
                </div>
              );
            })}
        </Map>
      </div>
    </div>
  );
}
