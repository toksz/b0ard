import React from 'react';
    import './MediaItem.css';

    function MediaItem({ item }) {
      return (
        <div className="media-item">
          {item.thumb_path && <img src={item.thumb_path} alt={item.url} />}
        </div>
      );
    }

    export default MediaItem;
