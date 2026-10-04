import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import image1 from '../images/WhatsApp Image 2026-09-02 at 4.49.14 PM.jpeg'
import image2 from '../images/WhatsApp Image 2026-09-02 at 4.49.17 PM.jpeg'
import image3 from '../images/WhatsApp Image 2026-09-02 at 4.49.20 PM.jpeg'
import './Home.css'

function Home() {
  const heroRef = useReveal()
  const sec1Ref = useReveal()
  const sec2Ref = useReveal()
  const sec3Ref = useReveal()
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
          <h1>Datawiz</h1>
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

      <section className="alt-section section-left" ref={sec1Ref}>
        <div className="alt-image reveal reveal-left">
          <div className="image-frame">
            <img src={image1} alt="Data Bits community" />
          </div>
        </div>
        <div className="alt-text reveal">
          <span className="section-tag">Who We Are</span>
          <h2>A Community of Innovators</h2>
          <p>
            Data Bits is more than just a club - it's a family of passionate
            individuals united by a shared love for technology and data science.
            From our very first meeting, we've grown into a hub of creativity,
            collaboration, and continuous learning.
          </p>
          <div className="alt-stats">
            <div className="stat">
              <span className="stat-num">50+</span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="stat">
              <span className="stat-num">6+</span>
              <span className="stat-label">Years Growing</span>
            </div>
            <div className="stat">
              <span className="stat-num">∞</span>
              <span className="stat-label">Ideas Shared</span>
            </div>
          </div>
        </div>
      </section>

      <section className="alt-section section-right section-tint" ref={sec2Ref}>
        <div className="alt-text reveal">
          <span className="section-tag">For Data Enthusiasts</span>
          <h2>Wizalyse: Data Hackathon</h2>
          <p>
            Wizalyse is our hackathon crafted for everyone who loves turning raw
            data into stories that matter. Dive into real-world datasets,
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
          <Link to="/register" className="btn btn-primary">
            Register Now
          </Link>
        </div>
        <div className="alt-image reveal reveal-right">
          <div className="image-frame">
            <img src={image2} alt="data wizalyze hackathon" />
          </div>
        </div>
      </section>

      <section className="alt-section section-left" ref={sec3Ref}>
        <div className="alt-image reveal reveal-left">
          <div className="image-frame">
            <img src={image3} alt="Data Bits team" />
          </div>
        </div>
        <div className="alt-text reveal">
          <span className="section-tag">Join Our Team</span>
          <h2>Recruitments Open — Sep 3, 2026</h2>
          <p>
            Our exciting recruitment drive kicks off on <strong>3rd September
            2026</strong>! This is your chance to become part of the Datawiz
            family. We're looking for passionate, curious, and driven students
            who want to grow through code, data, and creativity.
          </p>
          <div className="alt-features">
            <div className="alt-feature">
              <span className="feature-icon">&#128231;</span>
              <span>Registration open</span>
            </div>
            <div className="alt-feature">
              <span className="feature-icon">&#128197;</span>
              <span>Sep 3, 2026</span>
            </div>
            <div className="alt-feature">
              <span className="feature-icon">&#127891;</span>
              <span>All years welcome</span>
            </div>
          </div>
          <Link to="/register" className="btn btn-primary">
            Register Today
          </Link>
        </div>
      </section>

      <section className="cta" ref={ctaRef}>
        <div className="cta-features">
          <h2 className="cta-title">Why Join Us?</h2>
          <div className="cta-features-grid">
            <div className="cta-feature">
              <span className="cta-feature-icon">&#128101;</span>
              <h3>Community</h3>
              <p>
                Be part of a thriving community that supports and uplifts each
                other. Share ideas, collaborate on projects, and grow together.
              </p>
            </div>
            <div className="cta-feature">
              <span className="cta-feature-icon">&#127908;</span>
              <h3>Events</h3>
              <p>
                Participate in exciting events, workshops, and meetups. From
                tech talks to social gatherings, there is always something
                happening.
              </p>
            </div>
            <div className="cta-feature">
              <span className="cta-feature-icon">&#128279;</span>
              <h3>Networking</h3>
              <p>
                Connect with professionals and enthusiasts from diverse
                backgrounds. Build your network and discover new opportunities.
              </p>
            </div>
            <div className="cta-feature">
              <span className="cta-feature-icon">&#128640;</span>
              <h3>Growth</h3>
              <p>
                Accelerate your personal and professional development. Access
                resources, mentorship, and hands-on learning experiences.
              </p>
            </div>
          </div>
        </div>
        <div className="cta-content reveal">
          <h2>Ready to Join the Community?</h2>
          <p>Join Data Bits today and become part of something amazing.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
