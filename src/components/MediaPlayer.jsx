import React, { useState, useRef, useEffect } from 'react';
    import './MediaPlayer.css';
    import 'video.js/dist/video-js.css';

    function MediaPlayer({ url, type }) {
      const audioRef = useRef(null);
      const [isPlaying, setIsPlaying] = useState(false);
      const [currentTime, setCurrentTime] = useState(0);
      const [duration, setDuration] = useState(0);

      useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
          setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
          setDuration(audio.duration);
        };

        const handleEnded = () => {
          setIsPlaying(false);
          setCurrentTime(0);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audio.removeEventListener('ended', handleEnded);
        };
      }, [url]);

      const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      };

      const handleSeek = (e) => {
        const audio = audioRef.current;
        if (!audio) return;

        const seekTime = parseFloat(e.target.value);
        audio.currentTime = seekTime;
        setCurrentTime(seekTime);
      };

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

      const isAudio = type === 'mp3' || type === 'wav' || type === 'ogg';

      if (isAudio) {
        return (
          <div className="audio-player">
            <audio ref={audioRef} src={url} />
            <div className="audio-controls">
              <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
              />
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="media-player">
            <video controls src={url} className="video-player" />
          </div>
        );
      }
    }

    export default MediaPlayer;
