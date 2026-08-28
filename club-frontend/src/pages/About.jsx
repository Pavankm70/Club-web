import './About.css'

function About() {
  const teamMembers = [
    { name: 'Alex Johnson', role: 'President', description: 'Leading the club with vision and passion.' },
    { name: 'Sarah Williams', role: 'Vice President', description: 'Organizing events and building community.' },
    { name: 'Michael Brown', role: 'Treasurer', description: 'Managing finances and resources.' },
    { name: 'Emily Davis', role: 'Secretary', description: 'Keeping everything organized and on track.' },
  ]

  const timeline = [
    { year: '2020', title: 'Club Founded', description: 'Started with 10 passionate members.' },
    { year: '2021', title: 'First Major Event', description: 'Hosted our first community workshop with 100+ attendees.' },
    { year: '2022', title: 'Expanded Membership', description: 'Grew to over 200 active members.' },
    { year: '2023', title: 'Community Impact', description: 'Launched outreach programs and partnerships.' },
    { year: '2024', title: 'Digital Transformation', description: 'Built our online platform for seamless management.' },
  ]

  return (
    <div className="about">
      <section className="about-hero">
        <h1>About ClubHub</h1>
        <p>Building a community that inspires, connects, and empowers.</p>
      </section>

      <section className="about-mission">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>
            To create an inclusive and dynamic community that fosters personal growth,
            professional development, and meaningful connections among our members.
            We believe in the power of collaboration and shared experiences.
          </p>
        </div>
        <div className="mission-card">
          <h2>Our Vision</h2>
          <p>
            To be the leading community platform that empowers individuals to reach
            their full potential through networking, learning, and mutual support.
            We envision a world where every member feels valued and inspired.
          </p>
        </div>
      </section>

      <section className="about-values">
        <h2 className="section-title">Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Integrity</h3>
            <p>We operate with honesty and transparency in all our interactions.</p>
          </div>
          <div className="value-item">
            <h3>Inclusivity</h3>
            <p>We welcome everyone regardless of background or experience level.</p>
          </div>
          <div className="value-item">
            <h3>Innovation</h3>
            <p>We embrace new ideas and creative approaches to problem solving.</p>
          </div>
          <div className="value-item">
            <h3>Excellence</h3>
            <p>We strive for the highest quality in everything we do.</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2 className="section-title">Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-avatar">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-timeline">
        <h2 className="section-title">Our Journey</h2>
        <div className="timeline">
          {timeline.map((item, index) => (
            <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
