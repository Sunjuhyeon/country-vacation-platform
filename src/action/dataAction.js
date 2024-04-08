import axios from 'axios';
import {FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE} from './actionTypes';
 
const URL =
  'http://api.data.go.kr/openapi/tn_pubr_public_frhl_exprn_vilage_api';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try{
      const encodedApiKey = process.env.REACT_APP_API_KEY;
      const decodedApiKey = decodeURIComponent(encodedApiKey);

      const provinces = [
        '경기도',
        '전북특별자치도',
        '전라남도',
        '광주광역시',
        '인천광역시',
        '강원특별자치도',
        '제주특별자치도',
        '대전광역시',
        '대구광역시',
        '세종특별자치시',
        '울산광역시',
        '부산광역시',
        '충청남도',
        '충청북도',
        '경상남도',
        '경상북도',
      ];

      const dataByProvince = await Promise.all(provinces.map(async (province) => {
        const response = await axios.get(URL, {
          params: {
            serviceKey: decodedApiKey,
            pageNo: 1,
            numOfRows: 500,
            type: 'json',
            ctprvnNm: province,
          },
        });
        return response.data?.response?.body?.items || [];
      }));

      const falttenedData = dataByProvince.flat();
      sessionStorage.setItem('cacheData', JSON.stringify(falttenedData));
      dispatch(fetchDataSuccess(falttenedData));
    } catch (error) {
      console.error('에러발생', error);
      dispatch(fetchDataFailure(error.message));
    }
  }; 
};