import React from 'react';
import './HomePage.css';
import NavBar from '../../components/NavBar/NavBar';

const HomePage = () => (
  <div className="container">
    <div className="indicator" />

    <NavBar />

    <div id="demo" />

    <div className="details" id="details-even">
      <div className="place-box">
        <div className="text">Welcome to FairyFinds</div>
      </div>
      <div className="title-box-1">
        <div className="title-1">Artisan Wreaths</div>
      </div>
      <div className="title-box-2">
        <div className="title-2">& Crystal Jewelry</div>
      </div>
      <div className="desc">
        Welcome to FairyFinds, where modern elegance meets artisan craftsmanship.
        Nestled in a quaint corner,
        our shop delights young women with beautifully curated wreaths, sparkling crystal jewelry,
        and handcrafted
        cedar garments. Whether you're seeking
        a unique gift or treating yourself, FairyFinds offers exquisite pieces
        that captivate with their charm and affordability. Step into a world of creativity
        and charm – discover your next favorite piece at FairyFinds today.
      </div>

      <div className="cta">
        <button type="button" className="bookmark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          </svg>
        </button>
        <button type="button" className="discover">Discover Location</button>
      </div>
    </div>

    <div className="pagination" id="pagination">
      <div className="arrow arrow-left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        </svg>
      </div>
      <div className="arrow arrow-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        </svg>
      </div>
      <div className="progress-sub-container">
        <div className="progress-sub-background">
          <div className="progress-sub-foreground" />
        </div>
      </div>
      <div className="slide-numbers" id="slide-numbers" />
    </div>

    <div className="cover" />
  </div>
);

export default HomePage;
