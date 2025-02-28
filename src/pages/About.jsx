import React from 'react';
import '../styles/About.css';

export default function AboutPage() {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1 className="about-title">About Weather-Themed Fun</h1>
        <p className="about-description">
          Welcome to Weather-Themed Fun! This app is designed to help you discover exciting activities based on today's weather.
          Whether it's a sunny day, cloudy skies, or snowy fun, we provide suggestions to match your current surroundings and mood.
        </p>
      </section>

      <section className="about-features">
        <h2 className="features-title">Our Features</h2>
        <ul className="features-list">
          <li>Weather-based activity suggestions</li>
          <li>Outdoor adventures for sunny days</li>
          <li>Cozy indoor activities for cloudy days</li>
          <li>Fun indoor games for snowy weather</li>
        </ul>
      </section>

      <section className="about-team">
        <h2 className="team-title">Meet the Team</h2>
        <p className="team-description">
          We are a group of passionate developers, designers, and weather enthusiasts who wanted to create a fun, interactive
          way to explore the world based on weather conditions. Our goal is to make your day more enjoyable, no matter what the
          weather is like outside.
        </p>
      </section>

      <footer className="about-footer">
        <p>Made with love by the Weather-Themed Fun Team</p>
      </footer>
    </div>
  );
}
