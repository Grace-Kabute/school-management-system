import React from 'react'
import { useNavigate } from 'react-router-dom';
import school from '../Assets/akatsi.jpeg'
import students from '../Assets/akatsii.jpeg'




const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the navigation function


  const login = () => {
    console.log('clicked button...');
    
    navigate('/login');
  };

  const register = () => {
    console.log('clicked button...');
    
    navigate('/register');
  };


  return (
    <>
  <header className="navbar">
    <div className="navbar-brand">Akatsi College of Education</div>
    <nav className="nav-links">
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <button className="btn-login" onClick={login}>Login</button>
      <button className="btn-signup" onClick={register}>Sign Up</button>
    </nav>
  </header>

  <section className="hero">
    <div className="hero-text">
      <h1>Welcome to Akatsi College Practice School</h1>
      <p>Providing quality education to inspire, nurture, and shape future leaders.</p>
      <button className="btn-get-started" onClick="navigateToSignup()">Get Started</button>
    </div>
    <div className="hero-image">
      <img src={students} alt="School"/>
    </div>
  </section>

  <section id="about" className="about-section">
    <div className="about-image">
      <img src={school} alt="About Akatsi College" />
    </div>
    <div className="about-text">
      <h2>About Akatsi College Practice School</h2>
      <p>Akatsi College Practice School is dedicated to fostering a nurturing and inspiring learning environment. Our mission is to equip students with the skills and knowledge needed to excel academically and contribute positively to society.</p>
      <p>Our committed staff, innovative programs, and supportive community work together to provide an enriching experience for each student. Join us on this journey of growth and achievement.</p>
    </div>
  </section>

  <section id="contact" className="contact-section">
    <h2>Contact Us</h2>
    <p>Have any questions? Get in touch with us!</p>
    <div className="contact-info">
      <p><strong>Email:</strong> info@akatsicollege.edu</p>
      <p><strong>Phone:</strong> +233 456 7890</p>
      <div className="socials">
        <a href="https://www.facebook.com/akatsico/" className="social-link">Facebook</a>
        <a href="https://x.com/AkatsiOf" className="social-link">Twitter</a>
        <a href="https://en.wikipedia.org/wiki/Akatsi_College_of_Education" className="social-link">Wikipedia</a>
      </div>
    </div>
  </section>

  <footer className="footer">
    <p>&copy; 2024 Akatsi College Practice School. All Rights Reserved.</p>
  </footer>
  <script src="./App.js"></script>
    </>
  );

  
}

export default LandingPage