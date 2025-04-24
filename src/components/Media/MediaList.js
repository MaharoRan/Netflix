
import React from 'react';
import MediaItem from './MediaItem';

const MediaList = ({ mediaItems }) => {
  if (!mediaItems || mediaItems.length === 0) {
    return <p>Aucun média disponible</p>;
  }

  return (
    <div className="media-list">
      {mediaItems.map(item => (
        <MediaItem key={item.idFilm || item.idSerie} item={item} />
      ))}
    </div>
  );
};

export default MediaList;