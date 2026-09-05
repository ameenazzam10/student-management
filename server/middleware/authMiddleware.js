const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "غير مصرح لك بالدخول",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message:
        "انتهت جلسة الدخول، يرجى تسجيل الدخول مرة أخرى",
    });
  }
}

function employeeOnly(req, res, next) {
  if (req.user.role !== "employee") {
    return res.status(403).json({
      message: "هذه الصفحة خاصة بالموظف",
    });
  }

  next();
}

function studentOnly(req, res, next) {
  if (req.user.role !== "student") {
    return res.status(403).json({
      message: "هذه الصفحة خاصة بالطالب",
    });
  }

  next();
}

module.exports = {
  protect,
  employeeOnly,
  studentOnly,
};