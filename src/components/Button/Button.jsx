import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={styles.btnContainer}>
      <button type="button" className={styles.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
