import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';

export default function Gangwon(props) {
  useKakaoLoader();
  
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(null);

  useEffect(() => {
    console.log(props.data)

    if(props.data && props.data.length > 0){
      setIsOpen(new Array(props.data.length).fill(false));
    }
  }, [props.data]);

  const toggleMarker = (index) => {
   setIsOpen(prevState => {
    const newState = prevState.map((state, i) => i === index ? !state : false);
    return newState;
   })
  }

  // 카테고리 필터링 함수
  const handleCategoryFilter = category => {
    console.log('필터링 된 카테고리 : ', category)
    setFilteredCategory(category);
  };
  const getCategory = (exprnSe) => {
    if(!exprnSe) return '기타';
    const categorries = exprnSe.split('+');
    return categorries[0];
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => handleCategoryFilter(null)}>
          전체
        </button>
        <button
          type="button"
          onClick={() => handleCategoryFilter('농작물경작체험')}
        >
          농작물
        </button>
        <button
          type="button"
          onClick={() => handleCategoryFilter('만들기체험')}
        >
          만들기
        </button>
        <button
          type="button"
          onClick={() => handleCategoryFilter('전통문화체험')}
        >
          전통문화체험
        </button>
        <button type="button" onClick={() => handleCategoryFilter('기타')}>
          그 외
        </button>
      </div>
      <div>
        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: 37.8304115,
            lng: 128.2260705,
          }}
          style={{
            // 지도의 크기
            width: '100vw',
            height: '100vh',
          }}
          level={10} // 지도의 확대 레벨
        >
          {props.data &&
            props.data.map((position, index) => {
              const lat =
                position && position.latitude ? position.latitude : null;
              const lng =
                position && position.longitude ? position.longitude : null;
              const category = getCategory(position.exprnSe);
              //카테고리 필터링
              if (filteredCategory && category !== filteredCategory) {
                return null;
              }
              return (
                <MapMarker
                  position={{ lat: lat, lng: lng }}
                  image={{
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                    size: {
                      width: 24,
                      height: 35,
                    }, // 마커이미지의 크기입니다
                  }}
                  clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                  onClick={() => toggleMarker(index)}
                  title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  category={category}
                >
                  {isOpen[index] && (
                    <div
                      position={{ lat: lat, lng: lng }}
                    >
                      <div>
                        <p>{category}</p>
                        <p>{position.exprnVilageNm}</p>
                        <p>{position.rdnmadr}</p>
                        <ul>
                          {position.exprnCn
                            .split('+')
                            .slice(0, 3)
                            .map((item, idx) => {
                              return <li>{item}</li>;
                            })}
                        </ul>
                        <p>{position.phoneNumber}</p>
                        <p>
                          <a href={position.homepageUrl} target="_blank">
                            {position.homepageUrl}
                          </a>
                        </p>
                      </div>

                      <button type="button" onClick={() => toggleMarker(index)}>
                        close
                      </button>
                    </div>
                  )}
                </MapMarker>
              );
            }
          )}
        </Map>
      </div>
    </div>
  );
}
