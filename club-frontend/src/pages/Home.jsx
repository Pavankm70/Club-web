import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import image1 from '../images/WhatsApp Image 2026-09-02 at 4.49.14 PM.jpeg'
import image2 from '../images/WhatsApp Image 2026-09-02 at 4.49.17 PM.jpeg'
import image3 from '../images/WhatsApp Image 2026-09-02 at 4.49.20 PM.jpeg'
import './Home.css'

function Home() {
  const heroRef = useReveal()
  const img1Ref = useReveal()
  const txt1Ref = useReveal()
  const img2Ref = useReveal()
  const txt2Ref = useReveal()
  const img3Ref = useReveal()
  const txt3Ref = useReveal()
  const featuresRef = useReveal()
  const ctaRef = useReveal()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg">
          <span className="float-shape shape-1"></span>
          <span className="float-shape shape-2"></span>
          <span className="float-shape shape-3"></span>
        </div>
        <div className="hero-content reveal" ref={heroRef}>
          <span className="hero-badge">Welcome to</span>
          <h1>Datawitz</h1>
          <p className="hero-tagline">Turning Data into Innovation</p>
          <p className="hero-description">
            Join our vibrant community of tech enthusiasts, data lovers, and
            creative thinkers. Grow together, learn from each other, and build
            meaningful connections through code and data.
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

      <section className="alt-section section-left">
        <div className="alt-image reveal reveal-left" ref={img1Ref}>
          <div className="image-frame">
            <img src={image1} alt="Datawitz community" />
          </div>
        </div>
        <div className="alt-text reveal" ref={txt1Ref}>
          <span className="section-tag">Flagship Event</span>
          <h2>Datawitz Code Hackathon</h2>
          <p>
            Gear up for the biggest coding showdown of the year! Our flagship
            Code Hackathon brings together the sharpest minds to build,
            innovate, and compete for a grand prize pool of <strong>₹1,05,000</strong>.
            Whether you thrive on problem solving, system design, or building
            something entirely new, this is your stage to shine.
          </p>
          <div className="alt-stats">
            <div className="stat">
              <span className="stat-num">₹1.05L</span>
              <span className="stat-label">Prize Pool</span>
            </div>
            <div className="stat">
              <span className="stat-num">24hr</span>
              <span className="stat-label">Intense Build</span>
            </div>
            <div className="stat">
              <span className="stat-num">50+</span>
              <span className="stat-label">Teams Expected</span>
            </div>
          </div>
        </div>
      </section>

      <section className="alt-section section-right section-tint">
        <div className="alt-text reveal" ref={txt2Ref}>
          <span className="section-tag">For Data Enthusiasts</span>
          <h2>Visualize: Data Hackathon</h2>
          <p>
            Visualize is our hackathon crafted for everyone who loves turning
            raw data into stories that matter. Dive into real-world datasets,
            uncover hidden insights, and bring them to life with stunning,
            interactive visualizations. No matter your skill level, there's a
            category waiting for you.
          </p>
          <ul className="alt-list">
            <li>Real-world datasets &amp; challenges</li>
            <li>Data analysis &amp; storytelling</li>
            <li>Interactive dashboards &amp; charts</li>
            <li>Judged by industry mentors</li>
          </ul>
          <Link to="/login" className="btn btn-primary">
            Register Now
          </Link>
        </div>
        <div className="alt-image reveal reveal-right" ref={img2Ref}>
          <div className="image-frame">
            <img src={image2} alt="Datawitz events" />
          </div>
        </div>
      </section>

      <section className="alt-section section-left">
        <div className="alt-image reveal reveal-left" ref={img3Ref}>
          <div className="image-frame">
            <img src={image3} alt="Datawitz team" />
          </div>
        </div>
        <div className="alt-text reveal" ref={txt3Ref}>
          <span className="section-tag">Join the Team</span>
          <h2>Recruitments Open!</h2>
          <p>
            Want to be part of what we build? Our <strong>club recruitments are
            happening on 3rd September 2026</strong>. Whether you're into coding,
            design, data, content, or event management, there's a role for you
            in the Datawitz family. Bring your ideas, your energy, and your
            enthusiasm.
          </p>
          <div className="alt-date">
            <span className="date-day">03</span>
            <span className="date-info">
              <span className="date-month">September</span>
              <span className="date-year">2026</span>
            </span>
          </div>
          <div className="alt-features">
            <div className="alt-feature">
              <span className="feature-icon">&#128170;</span>
              <span>All skill levels</span>
            </div>
            <div className="alt-feature">
              <span className="feature-icon">&#128101;</span>
              <span>Multiple roles</span>
            </div>
            <div className="alt-feature">
              <span className="feature-icon">&#128197;</span>
              <span>3 Sept 2026</span>
            </div>
          </div>
          <Link to="/login" className="btn btn-primary">
            Apply Now
          </Link>
        </div>
      </section>

      <section className="features" ref={featuresRef}>
        <h2 className="section-title">Why Join Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#128101;</div>
            <h3>Community</h3>
            <p>
              Be part of a thriving community that supports and uplifts each
              other. Share ideas, collaborate on projects, and grow together.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#127908;</div>
            <h3>Events</h3>
            <p>
              Participate in exciting events, workshops, and meetups. From tech
              talks to social gatherings, there is always something happening.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128279;</div>
            <h3>Networking</h3>
            <p>
              Connect with professionals and enthusiasts from diverse
              backgrounds. Build your network and discover new opportunities.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128640;</div>
            <h3>Growth</h3>
            <p>
              Accelerate your personal and professional development. Access
              resources, mentorship, and hands-on learning experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content reveal" ref={ctaRef}>
          <h2>Ready to Join the Community?</h2>
          <p>Join Datawitz today and become part of something amazing.</p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
