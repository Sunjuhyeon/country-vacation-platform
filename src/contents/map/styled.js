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