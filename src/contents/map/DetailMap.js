import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import useBreakpoint from './useBreakpoint';
import { InfoBox, MoblieInfoBox, SearchBox } from './styled';
import ImgMap1 from '../../assets/images/ico/map_cate1.png';
import ImgMap2 from '../../assets/images/ico/map_cate2.png';
import ImgMap3 from '../../assets/images/ico/map_cate3.png';
import ImgMap4 from '../../assets/images/ico/map_cate4.png';
import ImgMap5 from '../../assets/images/ico/map_cate5.png';
import Button from '../side/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMarkerIsOpen, setMapCenter } from '../../reducer/mapReducer';

export default function DetailMap({data}) {
  useKakaoLoader();
  const location = useLocation();
  const state = location.state;
  const dispatch = useDispatch();

  // const [filteredData, setFilteredData] = useState([]);
  const isOpenArray = useSelector(state => state.map.isOpenArray); // 커스텀 오버레이 관리
  const isCenter = useSelector(state => state.map.position); //지도 center 관리
  const [searchKeyword, setSearchKeyword] = useState('');
  const { isMobile, isDesktop } = useBreakpoint(); //breakpoint
  // const [mapCenter, setMapCenter] = useState({
  //   lat: state.cityState.lat,
  //   lng: state.cityState.lng,
  // }); //중심좌표 관리

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

  useEffect(() => {
    // if (state && state.cityName) {
    //   const cityName = state.cityName;
    //   const filtered = data.filter(item => item.signguNm === cityName);
    //   setFilteredData(filtered);
    //   dispatch(toggleMarkerIsOpen({ index: 0, isOpen: false }));

    //   console.log(filtered);
    // }
    if (state && state.cityState) {
      dispatch(
        setMapCenter({ lat: state.cityState.lat, lng: state.cityState.lng })
      );
    }
  }, [state]);

  console.log(state.cityName);

  const filteredByCity = data.filter(
    item => item.signguNm === state.cityName
  );
  const filteredData = filteredByCity.filter(item => {
    //검색어를 공백을 기준으로 분리하여 검색 조건을 생성
    const searchTerms = searchKeyword.toLowerCase().split(' ');

    // 각 검색어에 대해 장소의 이름, 주소, 체험프로그램, 카테고리 등에서 검색 수행
    return searchTerms.every(term => {
      if (
        item.exprnVilageNm.toLowerCase().includes(term) ||
        item.rdnmadr.toLowerCase().includes(term) ||
        item.exprnCn.toLowerCase().includes(term)
      ) {
        return true;
      }
      return false;
    });
  });

  return (
    <div>
      <div className="map_inner">
        <Button cityName={state.stateName} />
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
                  {isDesktop && isOpenArray[index] && (
                    <CustomOverlayMap
                      position={{ lat: lat, lng: lng }}
                      yAnchor={1.15} // 마커와의 간격을 조정할 수 있다
                      // zIndex={1000}
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
        </div>
      </div>
    </div>
  );
}
