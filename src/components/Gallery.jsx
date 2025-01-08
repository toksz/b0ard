import React, { useState, useEffect } from 'react';
import MediaItem from './MediaItem';
import FilterBar from './FilterBar';
import supabase from '../utils/supabaseClient';
import './Gallery.css';

function Gallery() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('media_items')
          .select('*');
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          console.log('Fetched data:', data); // Debugging line
          setMediaItems(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filteredItems = filterType === 'all'
    ? [...mediaItems]
    : mediaItems.filter(item => item.type === filterType);

  const sortedItems = [...filteredItems].sort((a, b) => {
      const titleA = a.url.toUpperCase();
      const titleB = b.url.toUpperCase();
      if (sortOrder === 'asc') {
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      } else {
        return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
      }
    });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <FilterBar
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="gallery">
        {sortedItems.map(item => (
          <MediaItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
