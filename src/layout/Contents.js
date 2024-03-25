import React, { useEffect } from 'react'
import Map from '../contents/Map'

export default function Contents(props) {
  return (
    <div>
      <Map data={props.data}/>
    </div>
  )
}
