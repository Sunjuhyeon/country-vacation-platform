import React from 'react'

export default function Header() {
  return (
    <header>
      <div className="hd_wrap">
        <h1 className="main_title">휴양마을 찾기 지도</h1>
        <p className="sub_title">
          전국 휴양마을을 찾아볼 수 있는 지도 플랫폼입니다! <br />
          원하는 지역을 클릭하여 촌캉스를 떠나보아요!
        </p>
      </div>
      <div className="bg_wrap">
        <i className="bg1"></i>
        <i className="bg3"></i>
        <i className="bg4"></i>
      </div>
    </header>
  );
}
