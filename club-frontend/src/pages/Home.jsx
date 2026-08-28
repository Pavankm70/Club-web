import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ClubHub</h1>
          <p className="hero-tagline">Where Passion Meets Community</p>
          <p className="hero-description">
            Join our vibrant community of like-minded individuals. Grow together,
            learn from each other, and build lasting connections.
          </p>
          <div className="hero-actions">
            <Link to="/members" className="btn btn-primary">
              Explore Members
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Join Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#128101;</div>
            <h3>Community</h3>
            <p>
              Be part of a thriving community that supports and uplifts each other.
              Share ideas, collaborate on projects, and grow together.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#127908;</div>
            <h3>Events</h3>
            <p>
              Participate in exciting events, workshops, and meetups. From tech talks
              to social gatherings, there is always something happening.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128279;</div>
            <h3>Networking</h3>
            <p>
              Connect with professionals and enthusiasts from diverse backgrounds.
              Build your network and discover new opportunities.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128640;</div>
            <h3>Growth</h3>
            <p>
              Accelerate your personal and professional development. Access resources,
              mentorship, and hands-on learning experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join our club today and become part of something amazing.</p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
