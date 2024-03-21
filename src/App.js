import React from 'react';
import Contents from './layout/Contents';

import info from './data/info.json';
import './assets/css/genaral.css';

export default function App() {
  return (
    <div>
      <Contents info={info}/>
    </div>
  )
}

