import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpenArray: [],
  position: [{ lat: 37.8304115 }, { lng: 128.2260705 }],
};

const mapSlice = createSlice({
  name: "map",
  initialState ,
  reducers:{
    toggleMarkerIsOpen(state, action){
      const {index, isOpen} = action.payload;
      const newIsOpenArray = new Array(state.isOpenArray.length).fill(false);
      newIsOpenArray[index] = isOpen; // 해당 인덱스의 isOpen 상태를 업데이트
      state.isOpenArray = newIsOpenArray;
    },

    setMapCenter(state, action){
      const{lat, lng} = action.payload;
      state.position = {lat, lng}
    },
  }
});

export const { toggleMarkerIsOpen, setMapCenter, setFilteredCategory, setFilteredCity } = mapSlice.actions;
export default mapSlice.reducer;