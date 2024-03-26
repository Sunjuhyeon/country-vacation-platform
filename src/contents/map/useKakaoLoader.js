import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: '836cf984a8d3c42b9549e290b9217dac',
    libraries: ['clusterer', 'drawing', 'services'],
  });
}
