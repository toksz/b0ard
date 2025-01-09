import React from 'react';
    import './MediaPlayer.css';
    import ReactPlayer from 'react-player';

    function MediaPlayer({ url }) {
      return (
        <div className="media-player">
          <ReactPlayer url={url} controls={true} width="100%" height="100%" />
        </div>
      );
    }

    export default MediaPlayer;
