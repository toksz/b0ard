import React from 'react';
import './MediaItem.css';

function MediaItem({ item }) {
  return (
    <div className="media-item">
      {item.url && <img src={item.url} alt={item.url} />}
    </div>
  );
}

export default MediaItem;
