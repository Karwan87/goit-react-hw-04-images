import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onItemClick }) => {
  return (
    <ul className={styles.gallery}>
      <div className={styles.galleryContainer}>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            index={index}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGallery;
