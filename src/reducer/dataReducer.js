import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_REQUEST,
} from '../action/actionTypes';

//데이터 관련 초기상태
const initialState = {
  loading: false,
  data: [],
  error: null,
};

//데이터 리듀서
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default dataReducer;
