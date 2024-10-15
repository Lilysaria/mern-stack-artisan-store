import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => (
  <div className={styles.container}>
    <div id="demo" />
    <div className={`${styles.details} ${styles.detailsEven}`}>
      <div className={styles.placeBox}>
        <div className={styles.text}>Welcome to FairyFinds</div>
      </div>
      <div className={styles.titleBox1}>
        <div className={styles.title1}>Artisan Wreaths</div>
      </div>
      <div className={styles.titleBox2}>
        <div className={styles.title2}>& Crystal Jewelry</div>
      </div>
      <div className={styles.desc}>
        Welcome to FairyFinds, where modern elegance meets artisan
        craftsmanship. Nestled in a quaint corner, our shop delights young women
        with beautifully curated wreaths, sparkling crystal jewelry, and
        handcrafted cedar garments. Whether you&apos;re seeking a unique gift or
        treating yourself, FairyFinds offers exquisite pieces that captivate
        with their charm and affordability. Step into a world of creativity and
        charm – discover your next favorite piece at FairyFinds today.
      </div>
      <div className={styles.cta}>
        <button type="button" className={styles.discover}>
          Shop Goods
        </button>
      </div>
    </div>
    <div className={styles.pagination} id="pagination">
      <div className={styles.progressSubContainer}>
        <div className={styles.progressSubBackground}>
          <div className={styles.progressSubForeground} />
        </div>
      </div>
      <div className={styles.slideNumbers} id="slide-numbers" />
    </div>
    <div className={styles.cover} />
  </div>
);

export default HomePage;
