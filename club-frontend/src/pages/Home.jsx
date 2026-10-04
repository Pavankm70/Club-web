import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import image1 from '../images/WhatsApp Image 2026-10-04 at 9.57.53 AM.jpeg'
import image2 from '../images/WhatsApp Image 2026-10-04 at 9.57.54 AM.jpeg'
import image3 from '../images/WhatsApp Image 2026-10-04 at 9.57.54 AM (1).jpeg'
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
          <h1>GDG</h1>
          <p className="hero-tagline">Google Developers Club</p>
          <p className="hero-description">
            Join our vibrant community of tech enthusiasts, developers, and
            creative thinkers. Grow together, learn from each other, and build
            meaningful connections through code and technology.
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
            <img src={image1} alt="Rajesh Hegde AI automation session" />
          </div>
        </div>
        <div className="alt-text reveal">
          <span className="section-tag">Guest Session</span>
          <h2>Rajesh Hegde on AI Automation</h2>
          <p>
            We are thrilled to host <strong>Rajesh Hegde</strong> for an exclusive
            session on <strong>AI Automation</strong>. Learn how intelligent
            automation is reshaping the way we build software, ship products,
            and solve real-world problems — straight from someone working at
            the forefront of the technology.
          </p>
          <ul className="alt-list">
            <li>Building intelligent, self-running workflows</li>
            <li>Practical tools for AI-powered automation</li>
            <li>Real-world use cases and live demos</li>
            <li>Open Q&amp;A with the speaker</li>
          </ul>
          <div className="alt-stats">
            <div className="stat">
              <span className="stat-num">AI</span>
              <span className="stat-label">Automation</span>
            </div>
            <div className="stat">
              <span className="stat-num">1+</span>
              <span className="stat-label">Guest Speaker</span>
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
          <span className="section-tag">Sponsored by Gemini, Google</span>
          <h2>Code Sprint 4.0</h2>
          <p>
            Code Sprint 4.0 is our flagship hackathon, proudly sponsored by
            <strong> Gemini from Google</strong>. Teams of four come together to
            build, break, and ship — turning bold ideas into working products in
            a single high-intensity sprint. Whether you design, code, or pitch,
            there's a track for you.
          </p>
          <ul className="alt-list">
            <li>48-hour build sprint with mentor support</li>
            <li>Gemini API &amp; Google Cloud integration tracks</li>
            <li>Live demos and judging by industry mentors</li>
            <li>Prizes, swag &amp; recognition from Google</li>
          </ul>
         
        </div>
        <div className="alt-image reveal reveal-right">
          <div className="image-frame">
            <img src={image2} alt="Code Sprint 4.0 hackathon" />
          </div>
        </div>
      </section>

      <section className="alt-section section-left" ref={sec3Ref}>
        <div className="alt-image reveal reveal-left">
          <div className="image-frame">
            <img src={image3} alt="GDG recruitment" />
          </div>
        </div>
        <div className="alt-text reveal">
          <span className="section-tag">Join Our Team</span>
          <h2>Recruitments Open — 5th &amp; 6th October</h2>
          <p>
            GDG (Google Developers Club) is recruiting on <strong>5th and 6th
            October</strong>! This is your chance to become part of the GDG
            family. We're looking for passionate, curious, and driven students
            who want to grow through code, technology, and creativity.
          </p>
          <div className="alt-features">
            <div className="alt-feature">
              <span className="feature-icon">&#128231;</span>
              <span>Registration open</span>
            </div>
            <div className="alt-feature">
              <span className="feature-icon">&#128197;</span>
              <span>5th &amp; 6th Oct</span>
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
          <p>Join GDG today and become part of something amazing.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
