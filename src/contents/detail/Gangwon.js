import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';

export default function Gangwon(props) {
  useKakaoLoader();
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
  return (
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
          width: '100%',
          height: '500px',
        }}
        level={11} // 지도의 확대 레벨
      >
        {props.data &&
          props.data.map((position, index) => {
            const lat =
              position && position.latitude ? position.latitude : null;
            const lng =
              position && position.longitude ? position.longitude : null;
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
              >
                {
                  isOpen[index] && (
                    <div>
                      <div tyle={{ padding: '5px', color: '#000' }}>
                        {position.exprnVilageNm}
                      </div>
                    </div>
                  )
                }
              </MapMarker>
            );
          })}
      </Map>
    </div>
  );
}
