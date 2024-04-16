import styled from 'styled-components';

export const InfoBox = styled.div`
  position: relative;
  width: 300px;
  min-height: 200px;
  border-radius: 15px;
  background-color: #fff;
  border: 2px solid #c4d7b2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  white-space: break-spaces;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: -8px;
    border: #c4d7b2 solid;
    border-width: 0px 2px 2px 0px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 11px;
    height: 11px;
    background-color: #fff;
  }
`;

export const MoblieInfoBox = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  border-radius: 10px;
  border: 2px solid #c4d7b2;
  background-color: #fff;
  z-index: 10;
`;

export const InfoList = styled.ul`
  position: absolute;
  top: 50%;
  right: 10px;
  z-index: 10;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  height: 80%;
  background-color: #ededed;
  border-radius: 6px;
  border: 1px solid #d3d3d3;
  overflow-y: auto;
`;
export const InfoListBox = styled.li`
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e9e9e9;
  min-height: 100px;
  padding: 10px;
  &:first-of-type{
    margin-top: 10px;
  }
`
export const SearchBox = styled.div`
  position: absolute;
  z-index: 10;
  top: 10px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const CircleBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: rgb(170 172 176) 0px 0px 5px;
`;