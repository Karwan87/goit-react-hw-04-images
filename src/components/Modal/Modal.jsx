import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BiX, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import styles from './Modal.module.css';

const Modal = ({ imageUrl, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      } else if (event.code === 'ArrowLeft') {
        onPrev();
      } else if (event.code === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  const handlePrevClick = event => {
    event.stopPropagation();
    onPrev();
  };

  const handleNextClick = event => {
    event.stopPropagation();
    onNext();
  };

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <BiX size={30} />
        </button>
        <img src={imageUrl} alt="" className={styles.image} />
        <div className={styles.navigator}>
          <button className={styles.prevButton} onClick={handlePrevClick}>
            <BiChevronLeft size={30} />
          </button>
          <button className={styles.nextButton} onClick={handleNextClick}>
            <BiChevronRight size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Modal;
