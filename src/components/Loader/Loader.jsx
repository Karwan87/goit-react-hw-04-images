import React from 'react';
import PropTypes from 'prop-types';
import { Rings } from 'react-loader-spinner';

const Loader = ({ isLoading }) => {
  return (
    <div>
      <Rings type="ThreeDots" color="#00BFFF" height={80} width={80} />
      <p>Loading...</p>
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
