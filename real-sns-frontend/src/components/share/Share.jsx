import React from 'react'
import "./Share.scss";
import { Image, Gif, Face, Analytics } from "@mui/icons-material";

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/person/1.jpeg" alt="" className="shareProfileImg" />
          <input placeholder="What's in your mind?" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareButtons">
          <div className="shareOptions">
            <div className="shareOption">
                <Image className="shareIcon" />
                <span className="shareOptionText">写真</span>
            </div>
            <div className="shareOption">
                <Gif className="shareIcon" />
                <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
                <Face className="shareIcon" />
                <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
                <Analytics className="shareIcon" />
                <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton">投稿</button>
        </div>
      </div>
    </div>
  )
}
