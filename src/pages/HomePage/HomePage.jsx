import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomePage.module.css';

const featuredProducts = [
  { id: 1, name: "Cedar Wreath", price: 49.99, image: "https://res.cloudinary.com/dgtqptpu1/image/upload/v1729028714/etsy_kruhwx.webp" },
  { id: 2, name: "Crystal Necklace", price: 39.99, image: "https://res.cloudinary.com/dgtqptpu1/image/upload/v1729034713/etsyrt0340350_ssq8hw.webp" },
  { id: 3, name: "Dried Flower Frame", price: 59.99, image: "https://res.cloudinary.com/dgtqptpu1/image/upload/v1729029664/ETSY685_mt7voi.jpg" },
  { id: 4, name: "Handmade Plushie", price: 29.99, image: "https://res.cloudinary.com/dgtqptpu1/image/upload/v1729034722/etsy7546856_uc3udo.webp" },
];

const HomePage = () => (
  <div className={styles.container}>
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Discover Unique Gifts at ForestFinds</h1>
        <p className={styles.subtitle}>Artisan Wreaths & Crystal Jewelry for Every Occasion</p>
        <Link href="/products" className={styles.ctaButton}>
          Shop Now
        </Link>
      </div>
    </section>

    <section className={styles.featuredProducts}>
      <h2 className={styles.sectionTitle}>Featured Products</h2>
      <div className={styles.productGrid}>
        {featuredProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <Image 
              src={product.image} 
              alt={product.name} 
              width={200} 
              height={200} 
            />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <button className={styles.addToCartButton}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.categories}>
      <h2 className={styles.sectionTitle}>Shop by Category</h2>
      <div className={styles.categoryGrid}>
        <Link href="/category/wreaths" className={styles.categoryCard}>
          <Image 
            src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1729028714/etsy_kruhwx.webp" 
            alt="Wreaths" 
            width={300} 
            height={200} 
          />
          <h3 className={styles.categoryName}>Wreaths</h3>
        </Link>
        <Link href="/category/jewelry" className={styles.categoryCard}>
          <Image 
            src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1729034029/etsyrdfgd_wsj2ad.jpg" 
            alt="Jewelry" 
            width={300} 
            height={200} 
          />
          <h3 className={styles.categoryName}>Jewelry</h3>
        </Link>
        <Link href="/category/gifts" className={styles.categoryCard}>
          <Image 
            src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1729034021/etsy57457_sbafmz.jpg" 
            alt="Gifts" 
            width={300} 
            height={200} 
          />
          <h3 className={styles.categoryName}>Gifts</h3>
        </Link>
      </div>
    </section>

    <section className={styles.testimonials}>
      <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
      <div className={styles.testimonialGrid}>
        <div className={styles.testimonialCard}>
          <p className={styles.testimonialText}>"The cedar wreath I ordered is absolutely stunning! The moment I opened the package, the fresh, woodsy scent filled the room. It's like having a piece of the forest right in my home."</p>
          <p className={styles.customerName}>- Sarah J.</p>
        </div>
        <div className={styles.testimonialCard}>
          <p className={styles.testimonialText}>"I'm in love with my new crystal jewelry! The natural, raw beauty of the stones is breathtaking. Each piece feels unique and special, just like nature intended."</p>
          <p className={styles.customerName}>- Michael T.</p>
        </div>
        <div className={styles.testimonialCard}>
          <p className={styles.testimonialText}>"The dried flower frame I purchased is a work of art. The delicate arrangement and soft colors bring a touch of natural elegance to my living room. It's like having a perpetual spring indoors!"</p>
          <p className={styles.customerName}>- Emily R.</p>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
