import React from 'react';
    import './MediaItem.css';
    import supabase from '../utils/supabaseClient';

    function MediaItem({ item }) {
      const storageUrl = supabase.storage.from('media').getPublicUrl(item.thumb_path).data.publicUrl;
      return (
        <div className="media-item">
          {item.thumb_path && <img src={storageUrl} alt={item.url} />}
        </div>
      );
    }

    export default MediaItem;
