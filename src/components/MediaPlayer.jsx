import React from 'react';
    import './MediaPlayer.css';
    import ReactPlayer from 'react-player';

    function MediaPlayer({ url, type }) {
      if (type === 'mp3' || type === 'wav' || type === 'ogg') {
        return (
          <div className="audio-player">
            <audio controls src={url} />
          </div>
        );
      } else {
        return (
          <div className="media-player">
            <ReactPlayer url={url} controls={true} width="100%" height="100%" />
          </div>
        );
      }
    }

    export default MediaPlayer;
