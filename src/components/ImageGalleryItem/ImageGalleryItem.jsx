import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onItemClick }) => {
  const handleClick = () => {
    onItemClick(image.largeImageURL);
  };

  return (
    <li className={styles.galleryItem}>
      <img
        src={image.webformatURL}
        alt=""
        className={styles.galleryItemImage}
        onClick={handleClick}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    selectedIndex: PropTypes.number.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
