import React from 'react'
import "./Timeline.scss";
import Share from '../share/Share';
export default function Timeline() {
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {/* <Post /> */}
      </div>
    </div>
  )
}
