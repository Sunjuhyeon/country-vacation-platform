import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function GangwonList(props) {

  return (
    <div>
      <div>
        <ul>
          {
          props.data.map((v, i) => {
            return (
              <li>
                {v.exprnVilageNm}+{v.signguNm}
                <ul>
                  {v.exprnCn.split('+').map((item, index) => {
                    if(index <= 2){
                      return(
                        <li>{item}</li>
                      )
                    }
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
