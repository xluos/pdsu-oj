import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './components/IntroBanner';
import './Home.scss';
export default function Home () { return (
  <div className="home-page" >
    <Banner></Banner>
    <div className="home-page--content">
      <div className="home-page--btn-group">
        <Link to="/problem">
          <div className="problem-link"></div>
        </Link>
        <Link to="/competition">
          <div className="competition-link"></div>
        </Link>
      </div>
    </div>
  </div>
);}
