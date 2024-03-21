import React from 'react'
import Map from '../contents/Map'

export default function Contents(props) {
  return (
    <div>
      <Map info={props.info}/>
    </div>
  )
}
