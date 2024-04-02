import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: '9376cf71b863f18f1ca0e3e6272a7e60',
    libraries: ['clusterer', 'drawing', 'services'],
  });
}
