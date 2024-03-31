import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { InfoBox } from './styled';
import ImgMap1 from '../../assets/images/ico/map_cate1.png';
import ImgMap2 from '../../assets/images/ico/map_cate2.png';
import ImgMap3 from '../../assets/images/ico/map_cate3.png';
import ImgMap4 from '../../assets/images/ico/map_cate4.png';
import ImgMap5 from '../../assets/images/ico/map_cate5.png';
import Button from '../side/Button';
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
} from './cityName';

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

export default function DetailMap({data}) {
  const location = useLocation();
  const state = location.state;
  const [isOpen, setIsOpen] = useState(false); //커스텀오버레이 관리
  const [filteredData, setFilteredData] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null); //체험프로그램 구분 관리
  const [filteredCity, setFilteredCity] = useState(null); //시군구명 관리
  const [mapCenter, setMapCenter] = useState({lat: 37.8304115, lng: 128.2260705}); //중심좌표 관리
  
  const toggleMarker = (index, position) => {
    setIsOpen(prevState => {
      // 새로운 상태 배열 생성
      const newState = new Array(prevState.length).fill(false);
      // 클릭된 마커의 isOpen 상태를 토글
      newState[index] = !prevState[index];
      // 새로운 상태 반환
      console.log(index, position)
      return newState;
    });
    setMapCenter(position);
  };
  
  // 체험프로그램 +로 나누어 첫번째 단어로 구분
  const getCategory = exprnSe => {
    if (!exprnSe) return '농촌체험';
    const categorries = exprnSe.split('+');
    return categorries[0] === '기타' ? '농촌체험' : categorries[0];
  };
  
  // 카테고리 필터링 이미지_이미지 매핑 객체 생성
  const categoryImage = {
    농작물경작체험: ImgMap1,
    만들기체험: ImgMap2,
    전통문화체험: ImgMap3,
    건강: ImgMap4,
    농촌체험: ImgMap5,
  };
  
  // 이미지 매핑 함수
  const getCategoryImage = category => {
    return categoryImage[category] || ImgMap5;
  };

  useEffect(() => {
    if (state && state.cityName) {
      const cityName = state.cityName;
      const filtered = data.filter(item => item.signguNm === cityName);
      setFilteredData(filtered);
      setIsOpen(new Array(state.cityName.length).fill(false));

      const coordinates = cityCoordinates[state.cityName];
      if (coordinates) {
        setMapCenter(coordinates);
      }
    }
    console.log(filteredData);
  }, [location.state]);

  return (
    <div className="map_inner">
      {/* <Button locaion={cityLocation} /> */}
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
          level={10} // 지도의 확대 레벨
        >
          {filteredData.map((position, index) => {
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
                  key={index}
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
                    // zIndex={1000}
                  >
                    <InfoBox>
                      <div className="info_overlay">
                        <div className="info_list">
                          <p className={`info_cate ${category}`}>{category}</p>
                          <p className="info_title">{position.exprnVilageNm}</p>
                          <ul className="info_act">
                            {position.exprnCn
                              .split('+')
                              .slice(0, 3)
                              .map((item, idx) => {
                                return <li className={`act${idx}`}>{item}</li>;
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
                                <a href={position.homepageUrl} target="_blank">
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
