import React from 'react';
import Link from 'next/link';
import styles from './HeroImage.module.css';

const HeroImage = () => {
  return (
    <header className={styles.hero}>
      <div className={styles.headerText}>
        <h1>
          ForestFinds <br />
          <span id={styles.photography}>boutique shop</span>
        </h1>
        <p>
          At ForestFinds, we specialize in modern, handcrafted wreaths and glass-pressed flowers that bring the beauty of nature into your home. Our unique designs are perfect for those seeking stylish decor with a touch of elegance. Discover the art of nature reimagined!
        </p>
        <Link href="/learn-more">
          <button className={styles.learnMoreButton}>Learn More</button>
        </Link>
      </div>
    </header>
  );
};

export default HeroImage;
