import React from 'react';
import './MediaPlayer.css';

function MediaPlayer({ url }) {
  return (
    <div className="media-player">
      <video controls src={url} className="video-player" />
    </div>
  );
}

export default MediaPlayer;
