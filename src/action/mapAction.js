import { SET_FILTERED_DATA, SET_IS_OPEN } from "./actionTypes";

export const setFilteredData = (data) => ({
  type: SET_FILTERED_DATA,
  payload: data,
})

export const setIsOpen = ({index, isOpen}) => ({
  type: SET_IS_OPEN,
  payload: {index, isOpen},
});