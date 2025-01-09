import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import supabase from '../utils/supabaseClient';
    import './MediaView.css';
    import MediaPlayer from './MediaPlayer';

    function MediaView() {
      const { id } = useParams();
      const navigate = useNavigate();
      const [mediaItem, setMediaItem] = useState(null);
      const [loading, setLoading] = useState(true);
      const [mediaItems, setMediaItems] = useState([]);
      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
        const fetchMedia = async () => {
          setLoading(true);
          try {
            const { data, error } = await supabase
              .from('media_items')
              .select('*')
              .order('id', { ascending: true });
            if (error) {
              console.error('Error fetching data:', error);
            } else {
              setMediaItems(data);
              const index = data.findIndex(item => item.id === parseInt(id));
              if (index !== -1) {
                setCurrentIndex(index);
                setMediaItem(data[index]);
              } else {
                console.error('Media item not found');
                navigate('/not-found');
              }
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchMedia();
      }, [id, navigate]);

      useEffect(() => {
        if (mediaItems.length > 0 && currentIndex >= 0 && currentIndex < mediaItems.length) {
          setMediaItem(mediaItems[currentIndex]);
        }
      }, [currentIndex, mediaItems]);

      const handlePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          navigate(`/media/${mediaItems[currentIndex - 1].id}`);
        }
      };

      const handleNext = () => {
        if (currentIndex < mediaItems.length - 1) {
          setCurrentIndex(currentIndex + 1);
          navigate(`/media/${mediaItems[currentIndex + 1].id}`);
        }
      };

      if (loading) {
        return <p>Loading...</p>;
      }

      if (!mediaItem) {
        return <p>Media item not found.</p>;
      }

      const storageUrl = supabase.storage.from('media').getPublicUrl(mediaItem.storage_path).data.publicUrl;
      const isImage = mediaItem.type === 'image' || mediaItem.type === 'jpeg' || mediaItem.type === 'png';

      return (
        <div className="media-view-container">
          <div className="media-display">
            {isImage ? (
              <img src={storageUrl} alt={mediaItem.url} className="media-image" />
            ) : (
              <MediaPlayer url={storageUrl} />
            )}
          </div>
          <div className="media-info">
            <p><strong>User:</strong> {mediaItem.user}</p>
            <p><strong>Type:</strong> {mediaItem.type}</p>
            <p><strong>Score:</strong> {mediaItem.score}</p>
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentIndex === mediaItems.length - 1}>
              Next
            </button>
          </div>
        </div>
      );
    }

    export default MediaView;
