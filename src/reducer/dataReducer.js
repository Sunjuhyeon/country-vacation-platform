import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Action
const fetchDataByProvince = async (province) => {
  try {
    const encodedApiKey = process.env.REACT_APP_API_KEY;
    const decodedApiKey = decodeURIComponent(encodedApiKey);

    const response = await axios.get(
      'http://api.data.go.kr/openapi/tn_pubr_public_frhl_exprn_vilage_api',
      {
        params: {
          serviceKey: decodedApiKey,
          pageNo: 1,
          numOfRows: 500,
          type: 'json',
          ctprvnNm: province, // 기본값으로 설정하거나 필요에 따라 변경할 수 있습니다.
        },
      }
    );
    // API 응답에서 'items'가 없는 경우 빈 배열 반환
    return response.data?.response?.body?.items || [];
  } catch (error) {
    console.error('에러 : ', error);
    throw error; // 에러를 다시 던져서 rejected 상태로 전달합니다.
  }
};

export const fetchData = createAsyncThunk( 'data/fetchData', async () => {
    try {
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

      const storedData = sessionStorage.getItem('cacheData');
      if (storedData) {
        return JSON.parse(storedData); //캐시된 데이터 반환
      } else {
        const dataByProvince = await Promise.all(
          provinces.map(async(provinces) => {
            return fetchDataByProvince(provinces); //각 지역별 데이터 가져오기
          })
        );
        const flattenedData = dataByProvince.flat();
        sessionStorage.setItem('cacheData', JSON.stringify(flattenedData));
        return flattenedData;
      }
    } catch (error) {
      console.error('에러발생', error);
    }
  });

const initialState = {
  isLoading : false,
  isError : false,
  data : null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
  },
});

export const dataSelector = (state) => state.data;
export default dataSlice.reducer;