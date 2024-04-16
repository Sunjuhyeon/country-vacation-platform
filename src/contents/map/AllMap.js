import React, { useEffect, useState } from 'react';
import {
  InfoBox,
  MoblieInfoBox,
  InfoList,
  InfoListBox,
  SearchBox,
} from './styled';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import useBreakpoint from './useBreakpoint';
import ImgMap1 from '../../assets/images/ico/map_cate1.png';
import ImgMap2 from '../../assets/images/ico/map_cate2.png';
import ImgMap3 from '../../assets/images/ico/map_cate3.png';
import ImgMap4 from '../../assets/images/ico/map_cate4.png';
import ImgMap5 from '../../assets/images/ico/map_cate5.png';
import Button from '../side/Button';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMarkerIsOpen, setMapCenter } from '../../reducer/mapReducer';

const { kakao } = window;

const cityCoordinates = {
  경기도: { lat: 37.519329, lng: 127.008509 },
  전라북도: { lat: 35.69513127, lng: 127.0997817 },
  전라남도: { lat: 34.96786688, lng: 126.7914556 },
  인천: { lat: 37.57252727, lng: 126.5667425 },
  강원도: { lat: 37.8304115, lng: 128.2260705 },
  제주도: { lat: 33.363734, lng: 126.54436 },
  대전·세종: { lat: 36.456858, lng: 127.321747 },
  대구: { lat: 36.12777953, lng: 128.6961202 },
  울산·부산: { lat: 35.507951, lng: 129.1496604 },
  충청남도: { lat: 36.521278, lng: 126.876731 },
  충청북도: { lat: 36.89241579, lng: 127.848779 },
  경상북도: { lat: 36.46440039, lng: 128.666684 },
  경상남도: { lat: 35.381824, lng: 128.230451 },
};

export default function AllMap(props) {
  useKakaoLoader();
  const location = useLocation();
  const state = location.state;
  const dispatch = useDispatch();

  const isOpenArray = useSelector(state => state.map.isOpenArray); // 커스텀 오버레이 관리
  const isCenter = useSelector(state => state.map.position); //지도 center 관리
  const [searchKeyword, setSearchKeyword] = useState('');
  const { isMobile, isDesktop } = useBreakpoint(); //breakpoint
  // const [filteredData, setFilteredData] = useState([]);

  // 데이터에서 지역명 변경
  const modifiedData = props.data.map(v => {
    if (v.ctprvnNm === '전북특별자치도') {
      return { ...v, ctprvnNm: '전라북도' };
    }
    if (v.ctprvnNm === '광주광역시') {
      return { ...v, ctprvnNm: '전라남도' };
    }
    if (v.ctprvnNm === '인천광역시') {
      return { ...v, ctprvnNm: '인천' };
    }
    if (v.ctprvnNm === '대구광역시') {
      return { ...v, ctprvnNm: '대구' };
    }
    if (v.ctprvnNm === '강원특별자치도') {
      return { ...v, ctprvnNm: '강원도' };
    }
    if (v.ctprvnNm === '제주특별자치도') {
      return { ...v, ctprvnNm: '제주도' };
    }
    if (v.ctprvnNm === '대전광역시' || v.ctprvnNm === '세종특별자치시') {
      return { ...v, ctprvnNm: '대전·세종' };
    }
    if (v.ctprvnNm === '울산광역시' || v.ctprvnNm === '부산광역시') {
      return { ...v, ctprvnNm: '울산·부산' };
    }

    return v;
  });

  useEffect(() => {
    if (state && state.cityName) {
      const cityName = state.cityName;
      // const filtered = modifiedData.filter(item => item.ctprvnNm === cityName);
      // setFilteredData(filtered);

      // dispatch(toggleMarkerIsOpen({ index: 0, isOpen: false }));
      console.log(cityName);

      const coordinates = cityCoordinates[state.cityName];
      if (coordinates) {
        dispatch(setMapCenter(coordinates));
      }
    }
  }, [location.state]);

  const toggleMarker = (index, position) => {
    const isOpen = !isOpenArray[index];
    dispatch(toggleMarkerIsOpen({ index, isOpen }));
    dispatch(setMapCenter(position));
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

  const filteredByCity = modifiedData.filter(item => item.ctprvnNm === state.cityName)
  const filteredData = filteredByCity.filter(item => {
    //검색어를 공백을 기준으로 분리하여 검색 조건을 생성
    const searchTerms = searchKeyword.toLowerCase().split(' ');

    // 각 검색어에 대해 장소의 이름, 주소, 체험프로그램, 카테고리 등에서 검색 수행
    return searchTerms.every(term => {
      if(item.exprnVilageNm.toLowerCase().includes(term) || item.rdnmadr.toLowerCase().includes(term) || item.exprnCn.toLowerCase().includes(term)){
        return true;
      }
      return false;
    })
  });


  return (
    <div>
      <div className="map_inner">
        <Button cityName={state.cityName} />
        <SearchBox>
          {/* 검색 입력 필드 */}
          <input
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
        </SearchBox>
        <div>
          <Map // 지도를 표시할 Container
            id="map"
            center={isCenter}
            isPanto={true}
            style={{
              // 지도의 크기
              width: '100%',
              height: '100vh',
            }}
            level={11} // 지도의 확대 레벨
          >
            {filteredData.map((position, index) => {
              const lat =
                position && position.latitude ? position.latitude : null;
              const lng =
                position && position.longitude ? position.longitude : null;
              const category = getCategory(position.exprnSe);
              const city =
                position && position.signguNm ? position.signguNm : null;
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
                  {isDesktop && isOpenArray[index] && (
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
          <div className="moblie_info">
            {filteredData.map((position, index) => {
              const lat =
                position && position.latitude ? position.latitude : null;
              const lng =
                position && position.longitude ? position.longitude : null;
              const category = getCategory(position.exprnSe);
              const city =
                position && position.signguNm ? position.signguNm : null;
              return (
                <div>
                  {isMobile && isOpenArray[index] && (
                    <MoblieInfoBox>
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
                    </MoblieInfoBox>
                  )}
                </div>
              );
            })}
          </div>
          {/* <InfoList>
            {filteredData.map((position, i) => {
              const lat =
                position && position.latitude ? position.latitude : null;
              const lng =
                position && position.longitude ? position.longitude : null;
              const category = getCategory(position.exprnSe);
              const city =
                position && position.signguNm ? position.signguNm : null;
              return (
                <InfoListBox>
                  <p className="info_title">{position.exprnVilageNm}</p>
                </InfoListBox>
              );
            })}
          </InfoList> */}
        </div>
      </div>
    </div>
  );
}
