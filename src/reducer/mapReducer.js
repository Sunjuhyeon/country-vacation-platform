import { SET_FILTERED_DATA, SET_IS_OPEN } from "../action/actionTypes";

const initialState = {
  filteredData : [],
  isOpen: {},
};

const mapReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_FILTERED_DATA:
      return{
        ...state,
        filteredData: action.payload
      };
    case SET_IS_OPEN:
      return{
        ...state,
        isOpen: {...state.isOpen, [action.payload.index]: action.payload.isOpen},
      };
    default:
      return state;
  }
}

export default mapReducer;