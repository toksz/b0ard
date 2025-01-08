import React from 'react';
import './MediaItem.css';
import MediaPlayer from './MediaPlayer';

function MediaItem({ item }) {
  return (
    <div className="media-item">
      {item.type === 'image' && <img src={item.url} alt={item.url} />}
      {item.type === 'video' && <MediaPlayer url={item.url} />}
      <h3>{item.url}</h3>
    </div>
  );
}

export default MediaItem;
