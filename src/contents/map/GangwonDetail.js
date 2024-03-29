import React, { useEffect, useState } from 'react';
import { InfoBox } from './styled';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import ImgMap1 from '../../assets/images/ico/map_cate1.png';
import ImgMap2 from '../../assets/images/ico/map_cate2.png';
import ImgMap3 from '../../assets/images/ico/map_cate3.png';
import ImgMap4 from '../../assets/images/ico/map_cate4.png';
import ImgMap5 from '../../assets/images/ico/map_cate5.png';

export default function GangwonDetail(props) {
  return (
    <div>
      <div className="map_inner">
        <div className="btn_wrap">
          <div className="city_btn_wrap">
            <button type="button" onClick={() => handleCityFilter(null)}>
              전체
            </button>
            {cityName.map((city, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleCityFilter(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
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
            level={mapLevel} // 지도의 확대 레벨
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
                        zIndex={1000}
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
    </div>
  );
}
