import React from 'react';

const Photo = ( {photo} ) => {
    return (
        <>
            <img src={photo.thmbnailUrl} alt={photo.title} />
            <h2>ID #{photo.id} {photo.title}</h2>
        </>
    );
};
export default Photo;