function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="university-logo">
          <div className="logo-icon">
            🎓
          </div>

          <div className="logo-text">
            <h2>جامعة العلوم التقنية</h2>
            <span>TECHNICAL SCIENCES UNIVERSITY</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home">الرئيسية</a>
          <a href="#about">عن الجامعة</a>
          <a href="#colleges">الكليات</a>
          <a href="#programs">البرامج الأكاديمية</a>
          <a href="#research">الأبحاث</a>
          <a href="#admissions">القبول</a>
        </div>

        <button className="portal-button">
          👤 بوابة الطالب
        </button>

        <button className="apply-button">
          تقديم الآن
        </button>

      </div>
    </nav>
  );
}

export default Navbar;