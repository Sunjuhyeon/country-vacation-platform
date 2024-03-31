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

const cityCoordinates = {
  원주시: { lat: 37.344446, lng: 127.949458 },
  춘천시: { lat: 37.885609, lng: 127.72999 },
  강릉시: { lat: 37.751853, lng: 128.876057 },
  동해시: { lat: 37.505447, lng: 129.097253 },
  속초시: { lat: 38.165187, lng: 128.551708 },
  삼척시: { lat: 37.28536762, lng: 129.1829375 },
  태백시: { lat: 37.093246, lng: 129.037977 },
  홍천군: { lat: 37.68569876, lng: 127.9752552 },
  철원군: { lat: 38.24492485, lng: 127.3430955 },
  횡성군: { lat: 37.473491, lng: 128.020853 },
  평창군: { lat: 37.473813, lng: 128.402503 },
  정선군: { lat: 37.364044, lng: 128.715579 },
  영월군: { lat: 37.1437245, lng: 128.4622759 },
  인제군: { lat: 38.078378, lng: 128.2435696 },
  고성군: { lat: 38.38799045, lng: 128.416207 },
  양양군: { lat: 38.03328216, lng: 128.560168 },
  화천군: { lat: 38.13393909, lng: 127.6767375 },
  양구군: { lat: 38.14409763, lng: 127.981198 },
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
