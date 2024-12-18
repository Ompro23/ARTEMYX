// components/Loader.tsx
import React from 'react';
import styles from './Loader.module.css'; // Add custom styles here if needed

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
