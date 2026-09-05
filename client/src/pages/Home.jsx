function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-small-title">
            WELCOME TO AL NOOR UNIVERSITY
          </span>

          <h1>
            Shaping Tomorrow,
            <br />
            <span>Together</span>
          </h1>

          <p>
            Discover a world-class education that prepares you
            for a successful future through innovation, knowledge,
            and excellence.
          </p>

          <div className="hero-buttons">
            <button className="primary-button">
              Explore Programs
            </button>

            <button className="secondary-button">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3>Quality Education</h3>
          <p>
            World-class education and experienced faculty
            dedicated to student success.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏛️</div>
          <h3>Modern Campus</h3>
          <p>
            Modern facilities and technology for an excellent
            learning environment.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Global Community</h3>
          <p>
            Join a diverse community of students from around
            the world.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Bright Future</h3>
          <p>
            Build your skills and prepare for a successful
            professional career.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <div className="about-content">
          <span className="section-label">ABOUT OUR UNIVERSITY</span>

          <h2>
            Education That
            <br />
            <span>Creates Leaders</span>
          </h2>

          <p>
            Al Noor University is committed to providing
            high-quality education, encouraging innovation,
            and developing future leaders.
          </p>

          <p>
            Our university provides students with the knowledge,
            skills, and opportunities they need to succeed in
            a rapidly changing world.
          </p>

          <button className="primary-button">
            Learn More
          </button>
        </div>

        <div className="about-box">
          <div className="about-number">25+</div>
          <div className="about-text">
            Years of
            <br />
            Excellence
          </div>

          <div className="about-number">15K+</div>
          <div className="about-text">
            Students
            <br />
            Worldwide
          </div>
        </div>
      </section>

      {/* Colleges */}
      <section className="colleges-section" id="colleges">
        <div className="section-heading">
          <span className="section-label">ACADEMIC EXCELLENCE</span>

          <h2>Our Colleges</h2>

          <p>
            Explore our colleges and discover the right
            academic path for your future.
          </p>
        </div>

        <div className="college-grid">
          <div className="college-card">
            <div className="college-icon">💻</div>
            <h3>College of Engineering</h3>
            <p>
              Computer Science, Software Engineering,
              Electrical Engineering and more.
            </p>
            <button>View Programs →</button>
          </div>

          <div className="college-card">
            <div className="college-icon">⚕️</div>
            <h3>College of Medicine</h3>
            <p>
              Prepare for a rewarding career in healthcare
              and medical sciences.
            </p>
            <button>View Programs →</button>
          </div>

          <div className="college-card">
            <div className="college-icon">📊</div>
            <h3>College of Business</h3>
            <p>
              Develop leadership and business skills for
              today's global economy.
            </p>
            <button>View Programs →</button>
          </div>

          <div className="college-card">
            <div className="college-icon">⚖️</div>
            <h3>College of Law</h3>
            <p>
              Study law and develop strong analytical and
              professional skills.
            </p>
            <button>View Programs →</button>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="programs-section" id="programs">
        <div className="section-heading">
          <span className="section-label">FIND YOUR PATH</span>

          <h2>Featured Programs</h2>

          <p>
            Choose from a wide range of undergraduate and
            graduate programs.
          </p>
        </div>

        <div className="programs-grid">
          <div className="program-card">
            <span>BACHELOR'S DEGREE</span>
            <h3>Software Engineering</h3>
            <p>4 Years</p>
            <button>Learn More →</button>
          </div>

          <div className="program-card">
            <span>BACHELOR'S DEGREE</span>
            <h3>Computer Science</h3>
            <p>4 Years</p>
            <button>Learn More →</button>
          </div>

          <div className="program-card">
            <span>BACHELOR'S DEGREE</span>
            <h3>Business Administration</h3>
            <p>4 Years</p>
            <button>Learn More →</button>
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section className="admissions-section" id="admissions">
        <div>
          <span className="section-label">START YOUR JOURNEY</span>

          <h2>Ready to Begin Your Future?</h2>

          <p>
            Take the first step toward an exciting academic
            journey at Al Noor University.
          </p>
        </div>

        <button className="primary-button">
          Apply Now
        </button>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-container">
          <div>
            <div className="university-logo">
              <div className="logo-icon">🎓</div>

              <div>
                <h2>AL NOOR</h2>
                <span>UNIVERSITY</span>
              </div>
            </div>

            <p>
              Excellence in education, innovation,
              and leadership.
            </p>
          </div>

          <div>
            <h3>University</h3>
            <a href="#about">About</a>
            <a href="#colleges">Colleges</a>
            <a href="#programs">Programs</a>
            <a href="#admissions">Admissions</a>
          </div>

          <div>
            <h3>Contact</h3>
            <p>📍 University Campus</p>
            <p>📞 +962 6 000 0000</p>
            <p>✉️ info@alnoor.edu</p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Al Noor University. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

export default Home;