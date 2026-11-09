import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api";


function saveLogin(data) {
  localStorage.setItem("portalToken", data.token);
  localStorage.setItem("portalUser", JSON.stringify(data.user));
}

function clearLogin() {
  localStorage.removeItem("portalToken");
  localStorage.removeItem("portalUser");
}

function getSavedUser() {
  try {
    const saved = localStorage.getItem("portalUser");
    const token = localStorage.getItem("portalToken");

    if (!saved || !token) return null;

    return JSON.parse(saved);
  } catch {
    return null;
  }
}


export default function App() {
  const [user, setUser] = useState(getSavedUser);
  const [authPage, setAuthPage] = useState(null);

  const [studentPage, setStudentPage] = useState("home");
  const [studentHistory, setStudentHistory] = useState([]);

  const [employeePage, setEmployeePage] = useState("home");
  const [employeeHistory, setEmployeeHistory] = useState([]);

  function login(data) {
    saveLogin(data);
    setUser(data.user);
    setAuthPage(null);

    setStudentPage("home");
    setStudentHistory([]);

    setEmployeePage("home");
    setEmployeeHistory([]);
  }

  function logout() {
    clearLogin();

    setUser(null);
    setAuthPage(null);

    setStudentPage("home");
    setStudentHistory([]);

    setEmployeePage("home");
    setEmployeeHistory([]);
  }


  function goStudentPage(nextPage) {
    if (nextPage === studentPage) return;

    setStudentHistory((oldHistory) => [
      ...oldHistory,
      studentPage,
    ]);

    setStudentPage(nextPage);
  }

  function backStudentPage() {
    if (studentHistory.length === 0) {
      setStudentPage("home");
      return;
    }

    const history = [...studentHistory];
    const previous = history.pop();

    setStudentHistory(history);
    setStudentPage(previous);
  }

  function goEmployeePage(nextPage) {
    if (nextPage === employeePage) return;

    setEmployeeHistory((oldHistory) => [
      ...oldHistory,
      employeePage,
    ]);

    setEmployeePage(nextPage);
  }

  function backEmployeePage() {
    if (employeeHistory.length === 0) {
      setEmployeePage("home");
      return;
    }

    const history = [...employeeHistory];
    const previous = history.pop();

    setEmployeeHistory(history);
    setEmployeePage(previous);
  }


  if (user?.role === "employee") {
    return (
      <EmployeePortal
        employee={user}
        page={employeePage}
        goPage={goEmployeePage}
        goBack={backEmployeePage}
        logout={logout}
      />
    );
  }


  if (user?.role === "student") {
    return (
      <StudentPortal
        student={user}
        page={studentPage}
        goPage={goStudentPage}
        goBack={backStudentPage}
        logout={logout}
      />
    );
  }


  if (authPage === "student") {
    return (
      <StudentLogin
        onLogin={login}
        onBack={() => setAuthPage(null)}
      />
    );
  }

  if (authPage === "employee") {
    return (
      <EmployeeLogin
        onLogin={login}
        onBack={() => setAuthPage(null)}
      />
    );
  }

  return (
    <UniversityHome
      onStudentLogin={() => setAuthPage("student")}
      onEmployeeLogin={() => setAuthPage("employee")}
    />
  );
}


function UniversityHome({
  onStudentLogin,
  onEmployeeLogin,
}) {
  return (
    <div className="public-home" dir="rtl">

      <nav className="public-navbar">

        <div className="public-logo">
          <div className="public-logo-icon">
            🎓
          </div>

          <div>
            <strong>
              جامعة العلوم التقنية
            </strong>

            <span>
              UNIVERSITY OF TECHNICAL SCIENCES
            </span>
          </div>
        </div>

        <div className="public-links">

          <a href="#home">الرئيسية</a>

          <a href="#about">عن الجامعة</a>

          <a href="#programs">البرامج</a>

          <button
            className="login-button employee-login-nav"
            onClick={onEmployeeLogin}
          >
            دخول الموظف
          </button>

          <button
            className="login-button"
            onClick={onStudentLogin}
          >
            دخول الطالب
          </button>

        </div>
      </nav>

      <section
        id="home"
        className="public-hero"
      >
        <div className="hero-overlay" />

        <div className="hero-content">

          <span className="hero-small">
            UNIVERSITY OF TECHNICAL SCIENCES
          </span>

          <h1>
            جامعة العلوم التقنية
          </h1>

          <p>
            نحو تعليم تقني متميز ومستقبل أكاديمي أفضل
          </p>

          <div className="hero-buttons">

            <button
              className="gold-button"
              onClick={onStudentLogin}
            >
              دخول بوابة الطالب
            </button>

            <button
              className="outline-button"
              onClick={onEmployeeLogin}
            >
              بوابة الموظف
            </button>

          </div>

        </div>
      </section>

      <section className="public-features">

        <Feature
          icon="🎓"
          title="تعليم متميز"
          text="برامج أكاديمية وتقنية متخصصة."
        />

        <Feature
          icon="💻"
          title="بيئة تقنية"
          text="نستخدم أحدث التقنيات في التعليم."
        />

        <Feature
          icon="🏆"
          title="مستقبل أفضل"
          text="نؤهل الطلبة لسوق العمل."
        />

      </section>

      <section
        id="about"
        className="public-section about-public"
      >

        <div>

          <span className="section-label">
            ABOUT UNIVERSITY
          </span>

          <h2>
            عن جامعة العلوم التقنية
          </h2>

          <p>
            تسعى الجامعة إلى توفير بيئة تعليمية
            متقدمة تجمع بين المعرفة الأكاديمية
            والتطبيق العملي والتقنيات الحديثة.
          </p>

        </div>

        <div className="public-card">

          <div className="big-icon">
            🏛️
          </div>

          <h3>
            بيئة جامعية متطورة
          </h3>

          <p>
            خدمات إلكترونية متكاملة للطلبة والموظفين.
          </p>

        </div>

      </section>

      <section
        id="programs"
        className="public-section"
      >

        <span className="section-label">
          ACADEMIC PROGRAMS
        </span>

        <h2>
          البرامج الأكاديمية
        </h2>

        <div className="public-card-grid">

          <PublicProgram
            icon="💻"
            title="هندسة البرمجيات"
          />

          <PublicProgram
            icon="🌐"
            title="تكنولوجيا المعلومات"
          />

          <PublicProgram
            icon="🔐"
            title="الأمن السيبراني"
          />

        </div>

      </section>

      <section className="admission-banner">

        <div>
          <h2>
            ابدأ رحلتك الأكاديمية
          </h2>

          <p>
            سجّل دخولك إلى البوابة الإلكترونية.
          </p>
        </div>

        <button
          className="gold-button"
          onClick={onStudentLogin}
        >
          دخول الطالب
        </button>

      </section>

      <footer>

        <div>
          <strong>
            جامعة العلوم التقنية
          </strong>

          <span>
            UNIVERSITY OF TECHNICAL SCIENCES
          </span>
        </div>

        <p>
          © 2026 جامعة العلوم التقنية - جميع الحقوق محفوظة
        </p>

      </footer>

    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}

function PublicProgram({ icon, title }) {
  return (
    <div className="public-program">

      <div>
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        برنامج أكاديمي متخصص ضمن جامعة العلوم التقنية.
      </p>

    </div>
  );
}


function StudentLogin({
  onLogin,
  onBack,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "يرجى إدخال البريد الإلكتروني وكلمة المرور"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/student/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "بيانات الدخول غير صحيحة"
        );
      }

      onLogin(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page" dir="rtl">

      <div className="login-left">

        <div className="login-brand">

          <div className="login-brand-icon">
            🎓
          </div>

          <h1>
            جامعة العلوم التقنية
          </h1>

          <span>
            UNIVERSITY OF TECHNICAL SCIENCES
          </span>

        </div>

      </div>

      <div className="login-right">

        <div className="login-box">

          <button
            className="back-home"
            onClick={onBack}
          >
            ← رجوع للرئيسية
          </button>

          <div className="login-icon">
            👨‍🎓
          </div>

          <h2>
            دخول الطالب
          </h2>

          <p>
            أدخل بيانات الحساب التي تم إنشاؤها
            لك من قبل الموظف.
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label className="login-label">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="student@example.com"
            />

            <label className="login-label">
              كلمة المرور
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
            />

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </button>

          </form>

          <div className="login-info">
            حساب الطالب يتم إنشاؤه بواسطة الموظف.
          </div>

        </div>

      </div>

    </div>
  );
}


function EmployeeLogin({
  onLogin,
  onBack,
}) {
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (mode === "register") {

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        setError(
          "يرجى تعبئة جميع الحقول"
        );
        return;
      }

      if (password.length < 6) {
        setError(
          "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
        );
        return;
      }

      if (password !== confirmPassword) {
        setError(
          "كلمتا المرور غير متطابقتين"
        );
        return;
      }

    } else {

      if (!email || !password) {
        setError(
          "يرجى إدخال البريد الإلكتروني وكلمة المرور"
        );
        return;
      }

    }

    try {
      setLoading(true);

      const endpoint =
        mode === "login"
          ? "/auth/employee/login"
          : "/auth/employee/register";

      const body =
        mode === "login"
          ? {
              email,
              password,
            }
          : {
              name,
              email,
              password,
            };

      const response = await fetch(
        `${API_URL}${endpoint}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "حدث خطأ"
        );
      }

      onLogin(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page" dir="rtl">

      <div className="login-left">

        <div className="login-brand">

          <div className="login-brand-icon">
            👨‍💼
          </div>

          <h1>
            جامعة العلوم التقنية
          </h1>

          <span>
            UNIVERSITY OF TECHNICAL SCIENCES
          </span>

        </div>

      </div>

      <div className="login-right">

        <div className="login-box">

          <button
            className="back-home"
            onClick={onBack}
          >
            ← رجوع للرئيسية
          </button>

          <div className="login-icon">
            👨‍💼
          </div>

          <h2>
            {mode === "login"
              ? "دخول الموظف"
              : "إنشاء حساب موظف"}
          </h2>

          <p>
            {mode === "login"
              ? "تسجيل الدخول إلى نظام الموظفين."
              : "إنشاء حساب الموظف لأول مرة."}
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {mode === "register" && (
              <>
                <label className="login-label">
                  اسم الموظف
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="اسم الموظف"
                />
              </>
            )}

            <label className="login-label">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="employee@example.com"
            />

            <label className="login-label">
              كلمة المرور
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
            />

            {mode === "register" && (
              <>
                <label className="login-label">
                  تأكيد كلمة المرور
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="••••••••"
                />
              </>
            )}

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "يرجى الانتظار..."
                : mode === "login"
                ? "تسجيل الدخول"
                : "إنشاء حساب الموظف"}
            </button>

          </form>

          <button
            className="switch-login"
            onClick={() => {
              setMode(
                mode === "login"
                  ? "register"
                  : "login"
              );

              setError("");
            }}
          >
            {mode === "login"
              ? "إنشاء حساب موظف جديد"
              : "لدي حساب موظف - تسجيل الدخول"}
          </button>

        </div>

      </div>

    </div>
  );
}


function StudentPortal({
  student,
  page,
  goPage,
  goBack,
  logout,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  return (
    <div
      className="student-portal"
      dir="rtl"
    >

      <header className="top-header">

        <div className="university-name">

          <div className="header-logo">
            🎓
          </div>

          <div>

            <h2>
              جامعة العلوم التقنية
            </h2>

            <span>
              UNIVERSITY OF TECHNICAL SCIENCES
            </span>

          </div>

        </div>

        <div className="header-user">

          <div className="user-info">
            <strong>
              {student.name}
            </strong>

            <span>
              طالب
            </span>
          </div>

          <div className="user-avatar">
            👨‍🎓
          </div>

        </div>

      </header>

      <div className="portal-layout">

        <aside
          className={
            sidebarOpen
              ? "sidebar sidebar-open"
              : "sidebar sidebar-closed"
          }
        >

          <div className="sidebar-header">

            {sidebarOpen && (
              <div className="sidebar-title">
                <span>
                  بوابة الطالب
                </span>

                <small>
                  Student Portal
                </small>
              </div>
            )}

            <button
              className="toggle-button"
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
            >
              ☰
            </button>

          </div>

          <nav className="sidebar-menu">

            <SidebarButton
              icon="🏠"
              text="الرئيسية"
              active={page === "home"}
              open={sidebarOpen}
              onClick={() =>
                goPage("home")
              }
            />

            <SidebarButton
              icon="📚"
              text="المواد الدراسية"
              active={page === "courses"}
              open={sidebarOpen}
              onClick={() =>
                goPage("courses")
              }
            />

            <SidebarButton
              icon="📊"
              text="العلامات"
              active={page === "grades"}
              open={sidebarOpen}
              onClick={() =>
                goPage("grades")
              }
            />

            <SidebarButton
              icon="📝"
              text="التسجيل"
              active={page === "registration"}
              open={sidebarOpen}
              onClick={() =>
                goPage("registration")
              }
            />

            <SidebarButton
              icon="👤"
              text="معلوماتي"
              active={page === "profile"}
              open={sidebarOpen}
              onClick={() =>
                goPage("profile")
              }
            />

            <SidebarButton
              icon="📢"
              text="الإعلانات"
              active={page === "announcements"}
              open={sidebarOpen}
              onClick={() =>
                goPage("announcements")
              }
            />

          </nav>

          <div className="sidebar-bottom">

            <SidebarButton
              icon="⚙️"
              text="الإعدادات"
              active={page === "settings"}
              open={sidebarOpen}
              onClick={() =>
                goPage("settings")
              }
            />

            <SidebarButton
              icon="🚪"
              text="تسجيل الخروج"
              open={sidebarOpen}
              logout
              onClick={logout}
            />

          </div>

        </aside>

        <main className="main-content">

          {page !== "home" && (
            <button
              className="page-back-button"
              onClick={goBack}
            >
              ← رجوع
            </button>
          )}

          {page === "home" && (
            <StudentHome
              student={student}
            />
          )}

          {page === "courses" && (
            <CoursesPage />
          )}

          {page === "grades" && (
            <GradesPage />
          )}

          {page === "registration" && (
            <RegistrationPage />
          )}

          {page === "profile" && (
            <ProfilePage
              student={student}
            />
          )}

          {page === "announcements" && (
            <AnnouncementsPage />
          )}

          {page === "settings" && (
            <SettingsPage />
          )}

        </main>

      </div>

    </div>
  );
}

function SidebarButton({
  icon,
  text,
  active,
  open,
  logout,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`sidebar-item ${
        active ? "sidebar-active" : ""
      } ${
        logout ? "sidebar-logout" : ""
      }`}
      onClick={onClick}
      title={!open ? text : ""}
    >

      <span className="sidebar-icon">
        {icon}
      </span>

      {open && (
        <span className="sidebar-text">
          {text}
        </span>
      )}

    </button>
  );
}


function StudentHome({ student }) {
  return (
    <div className="page">

      <div className="welcome-card">

        <div>

          <span className="welcome-label">
            STUDENT PORTAL
          </span>

          <h1>
            أهلاً بك، {student.name} 👋
          </h1>

          <p>
            نتمنى لك فصلاً دراسياً ناجحاً ومميزاً.
          </p>

        </div>

        <div className="welcome-icon">
          🎓
        </div>

      </div>

      <div className="stats-grid">

        <StatCard
          icon="📚"
          number="6"
          label="المواد الدراسية"
        />

        <StatCard
          icon="⭐"
          number="87%"
          label="المعدل"
        />

        <StatCard
          icon="📝"
          number="18"
          label="الساعات المسجلة"
        />

        <StatCard
          icon="📢"
          number="4"
          label="الإعلانات"
        />

      </div>

      <div className="home-grid">

        <div className="dashboard-card">

          <h3>
            آخر الإعلانات
          </h3>

          <div className="announcement-row">

            <span>
              📢
            </span>

            <div>

              <strong>
                بدء التسجيل للفصل الجديد
              </strong>

              <p>
                منذ يومين
              </p>

            </div>

          </div>

          <div className="announcement-row">

            <span>
              📅
            </span>

            <div>

              <strong>
                موعد الامتحانات النهائية
              </strong>

              <p>
                منذ 4 أيام
              </p>

            </div>

          </div>

        </div>

        <div className="dashboard-card">

          <h3>
            المعلومات الأكاديمية
          </h3>

          <div className="info-line">
            <span>
              التخصص
            </span>

            <strong>
              {student.major || "غير محدد"}
            </strong>
          </div>

          <div className="info-line">
            <span>
              البريد
            </span>

            <strong>
              {student.email}
            </strong>
          </div>

          <div className="info-line">
            <span>
              العمر
            </span>

            <strong>
              {student.age || "غير محدد"}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  icon,
  number,
  label,
}) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <strong>
          {number}
        </strong>

        <span>
          {label}
        </span>

      </div>

    </div>
  );
}



function CoursesPage() {
  const courses = [
    ["CS101", "مقدمة في البرمجة", "3 ساعات"],
    ["SE201", "هندسة البرمجيات", "3 ساعات"],
    ["DB202", "قواعد البيانات", "3 ساعات"],
    ["WEB301", "تطوير الويب", "3 ساعات"],
    ["NET302", "شبكات الحاسوب", "3 ساعات"],
    ["AI401", "الذكاء الاصطناعي", "3 ساعات"],
  ];

  return (
    <div className="page">

      <PageHeader
        title="المواد الدراسية"
        subtitle="المواد المسجلة لهذا الفصل"
      />

      <div className="courses-grid">

        {courses.map((course) => (
          <div
            className="course-card"
            key={course[0]}
          >

            <span className="course-code">
              {course[0]}
            </span>

            <h3>
              {course[1]}
            </h3>

            <p>
              📚 {course[2]}
            </p>

            <button className="gold-button small">
              التفاصيل
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}



function GradesPage() {
  const grades = [
    ["مقدمة في البرمجة", "A", "90"],
    ["هندسة البرمجيات", "A-", "87"],
    ["قواعد البيانات", "B+", "84"],
    ["تطوير الويب", "A", "92"],
    ["شبكات الحاسوب", "B+", "85"],
  ];

  return (
    <div className="page">

      <PageHeader
        title="العلامات"
        subtitle="العلامات الأكاديمية"
      />

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>المادة</th>
              <th>التقدير</th>
              <th>العلامة</th>
            </tr>

          </thead>

          <tbody>

            {grades.map((grade, index) => (
              <tr key={index}>

                <td>
                  {grade[0]}
                </td>

                <td>
                  <span className="grade-badge">
                    {grade[1]}
                  </span>
                </td>

                <td>
                  {grade[2]}%
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}



function RegistrationPage() {
  return (
    <div className="page">

      <PageHeader
        title="التسجيل"
        subtitle="تسجيل المواد الدراسية"
      />

      <div className="dashboard-card">

        <h3>
          التسجيل للفصل الدراسي
        </h3>

        <p>
          يمكنك من هنا متابعة حالة التسجيل للمواد الدراسية.
        </p>

        <button className="gold-button">
          بدء التسجيل
        </button>

      </div>

    </div>
  );
}


function ProfilePage({ student }) {
  return (
    <div className="page">

      <PageHeader
        title="معلوماتي"
        subtitle="بيانات الطالب الشخصية"
      />

      <div className="profile-card">

        <div className="profile-avatar">
          👨‍🎓
        </div>

        <div className="profile-data">

          <div>
            <span>الاسم</span>
            <strong>{student.name}</strong>
          </div>

          <div>
            <span>البريد الإلكتروني</span>
            <strong>{student.email}</strong>
          </div>

          <div>
            <span>التخصص</span>
            <strong>
              {student.major || "غير محدد"}
            </strong>
          </div>

          <div>
            <span>العمر</span>
            <strong>
              {student.age || "غير محدد"}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}


function AnnouncementsPage() {
  return (
    <div className="page">

      <PageHeader
        title="الإعلانات"
        subtitle="آخر إعلانات الجامعة"
      />

      <div className="announcement-list">

        <div className="announcement-card">

          <div className="announcement-icon">
            📢
          </div>

          <div>

            <h3>
              بدء التسجيل للفصل الدراسي الجديد
            </h3>

            <p>
              يرجى متابعة بوابة الطالب لإتمام عملية التسجيل.
            </p>

            <small>
              منذ يومين
            </small>

          </div>

        </div>

        <div className="announcement-card">

          <div className="announcement-icon">
            📅
          </div>

          <div>

            <h3>
              جدول الامتحانات
            </h3>

            <p>
              تم نشر جدول الامتحانات النهائية.
            </p>

            <small>
              منذ 4 أيام
            </small>

          </div>

        </div>

      </div>

    </div>
  );
}



function SettingsPage() {
  return (
    <div className="page">

      <PageHeader
        title="الإعدادات"
        subtitle="إعدادات الحساب"
      />

      <div className="dashboard-card settings-card">

        <div className="setting-row">

          <div>
            <strong>
              الإشعارات
            </strong>

            <p>
              استقبال الإعلانات والتنبيهات
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>

        <div className="setting-row">

          <div>
            <strong>
              الوضع الليلي
            </strong>

            <p>
              تفعيل المظهر الداكن
            </p>
          </div>

          <input type="checkbox" />

        </div>

      </div>

    </div>
  );
}

function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="page-header">

      <div>

        <span>
          STUDENT PORTAL
        </span>

        <h1>
          {title}
        </h1>

        <p>
          {subtitle}
        </p>

      </div>

    </div>
  );
}


function EmployeePortal({
  employee,
  page,
  goPage,
  goBack,
  logout,
}) {
  return (
    <div
      className="employee-portal"
      dir="rtl"
    >

      <header className="employee-header">

        <div className="university-name">

          <div className="header-logo">
            🎓
          </div>

          <div>

            <h2>
              جامعة العلوم التقنية
            </h2>

            <span>
              UNIVERSITY OF TECHNICAL SCIENCES
            </span>

          </div>

        </div>

        <div className="employee-header-user">

          <div>
            <strong>
              {employee.name}
            </strong>

            <span>
              موظف
            </span>
          </div>

          <div className="employee-avatar">
            👨‍💼
          </div>

          <button
            className="header-logout"
            onClick={logout}
          >
            🚪 تسجيل الخروج
          </button>

        </div>

      </header>

      <main className="employee-main">

        {page !== "home" && (
          <button
            className="page-back-button"
            onClick={goBack}
          >
            ← رجوع
          </button>
        )}

        {page === "home" && (
          <EmployeeHome
            employee={employee}
            goPage={goPage}
            logout={logout}
          />
        )}

        {page === "create-student" && (
          <CreateStudentPage />
        )}

        {page === "students" && (
          <StudentsListPage />
        )}

        {page === "employee-profile" && (
          <EmployeeProfile
            employee={employee}
          />
        )}

      </main>

    </div>
  );
}


function EmployeeHome({
  employee,
  goPage,
  logout,
}) {
  return (
    <div className="page">

      <div className="employee-welcome">

        <div>

          <span>
            EMPLOYEE PORTAL
          </span>

          <h1>
            أهلاً بك، {employee.name} 👋
          </h1>

          <p>
            من هنا يمكنك إدارة حسابات الطلاب.
          </p>

        </div>

        <div className="employee-welcome-icon">
          👨‍💼
        </div>

      </div>

      <div className="employee-stats">

        <button
          type="button"
          className="employee-stat"
          onClick={() =>
            goPage("students")
          }
        >

          <span>
            👨‍🎓
          </span>

          <strong>
            الطلاب
          </strong>

          <p>
            إدارة حسابات الطلاب
          </p>

        </button>

        <button
          type="button"
          className="employee-stat"
          onClick={() =>
            goPage("create-student")
          }
        >

          <span>
            ➕
          </span>

          <strong>
            إضافة طالب
          </strong>

          <p>
            إنشاء حساب طالب جديد
          </p>

        </button>

        <button
          type="button"
          className="employee-stat"
          onClick={() =>
            goPage("students")
          }
        >

          <span>
            📋
          </span>

          <strong>
            البيانات
          </strong>

          <p>
            عرض بيانات الطلاب
          </p>

        </button>

      </div>

      <div className="employee-actions">

        <button
          type="button"
          className="employee-action-card"
          onClick={() =>
            goPage("create-student")
          }
        >

          <span>
            ➕
          </span>

          <div>

            <h3>
              تسجيل طالب جديد
            </h3>

            <p>
              إنشاء حساب دخول للطالب
            </p>

          </div>

        </button>

        <button
          type="button"
          className="employee-action-card"
          onClick={() =>
            goPage("students")
          }
        >

          <span>
            👨‍🎓
          </span>

          <div>

            <h3>
              قائمة الطلاب
            </h3>

            <p>
              عرض الطلاب المسجلين
            </p>

          </div>

        </button>

        <button
          type="button"
          className="employee-action-card"
          onClick={() =>
            goPage("employee-profile")
          }
        >

          <span>
            👤
          </span>

          <div>

            <h3>
              معلوماتي
            </h3>

            <p>
              بيانات حساب الموظف
            </p>

          </div>

        </button>

      </div>

      <button
        type="button"
        className="employee-logout-large"
        onClick={logout}
      >
        🚪 تسجيل الخروج
      </button>

    </div>
  );
}


function CreateStudentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    major: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      setError(
        "الاسم والبريد وكلمة المرور مطلوبة"
      );
      return;
    }

    if (form.password.length < 6) {
      setError(
        "كلمة المرور يجب أن تكون من 6 أحرف على الأقل"
      );
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("portalToken");

      const response = await fetch(
        `${API_URL}/students`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "حدث خطأ أثناء إنشاء الطالب"
        );
      }

      setMessage(
        "تم إنشاء حساب الطالب بنجاح ✅"
      );

      setForm({
        name: "",
        email: "",
        password: "",
        major: "",
        age: "",
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">

      <PageHeader
        title="تسجيل طالب جديد"
        subtitle="إنشاء حساب دخول للطالب"
      />

      <div className="student-form-card">

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          className="student-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              اسم الطالب
            </label>

            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="اسم الطالب الكامل"
            />

          </div>

          <div className="form-group">

            <label>
              البريد الإلكتروني
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="student@example.com"
            />

          </div>

          <div className="form-group">

            <label>
              كلمة المرور
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={updateField}
              placeholder=" 6 احرف عالاقل"
            />

          </div>

          <div className="form-group">

            <label>
              التخصص
            </label>

            <input
              name="major"
              value={form.major}
              onChange={updateField}
              placeholder="هندسة البرمجيات"
            />

          </div>

          <div className="form-group">

            <label>
              العمر
            </label>

            <input
              type="number"
              name="age"
              value={form.age}
              onChange={updateField}
              placeholder="العمر"
            />

          </div>

          <button
            className="gold-button form-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "جاري إنشاء الحساب..."
              : "إنشاء حساب الطالب"}
          </button>

        </form>

      </div>

    </div>
  );
}


function StudentsListPage() {
  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        const token =
          localStorage.getItem("portalToken");

        const response = await fetch(
          `${API_URL}/students`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "حدث خطأ "
          );
        }

        setStudents(data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  return (
    <div className="page">

      <PageHeader
        title="قائمة الطلاب"
        subtitle="الطلاب الذين تم تسجيلهم"
      />

      {loading && (
        <div className="loading-box">
          جاري تحميل الطلاب
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="table-card">

          <table>

            <thead>

              <tr>
                <th>الاسم</th>
                <th>البريد</th>
                <th>التخصص</th>
                <th>العمر</th>
              </tr>

            </thead>

            <tbody>

              {students.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="empty-table"
                  >
                    لا يوجد طلاب مسجلون حتى الآن
                  </td>

                </tr>

              ) : (

                students.map((student) => (
                  <tr key={student._id}>

                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.major || "-"}
                    </td>

                    <td>
                      {student.age || "-"}
                    </td>

                  </tr>
                ))

              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}


function EmployeeProfile({
  employee,
}) {
  return (
    <div className="page">

      <PageHeader
        title="معلوماتي"
        subtitle="بيانات حساب الموظف"
      />

      <div className="profile-card">

        <div className="profile-avatar employee">
          👨‍💼
        </div>

        <div className="profile-data">

          <div>
            <span>
              الاسم
            </span>

            <strong>
              {employee.name}
            </strong>
          </div>

          <div>
            <span>
              البريد الإلكتروني
            </span>

            <strong>
              {employee.email}
            </strong>
          </div>

          <div>
            <span>
              الصلاحية
            </span>

            <strong>
              موظف
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}