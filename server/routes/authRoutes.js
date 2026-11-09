const express = require("express");
const jwt = require("jsonwebtoken");

const Employee = require("../models/Employee");
const Student = require("../models/Student");

const router = express.Router();



function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}


router.post("/employee/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "جميع الحقول مطلوبة",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingEmployee = await Employee.findOne({
      email: cleanEmail,
    });

    if (existingEmployee) {
      return res.status(400).json({
        message:
          "هذا البريد الإلكتروني مستخدم مسبقاً",
      });
    }

    const employee = await Employee.create({
      name: name.trim(),
      email: cleanEmail,
      password,
      role: "employee",
    });

    const token = createToken(employee);

    return res.status(201).json({
      message: "تم إنشاء حساب الموظف بنجاح",
      token,
      user: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    console.error(
      "EMPLOYEE REGISTER ERROR:",
      error
    );

    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "هذا البريد الإلكتروني مستخدم مسبقاً",
      });
    }

    return res.status(500).json({
      message:
        error.message ||
        "حدث خطأ في إنشاء حساب الموظف",
    });
  }
});


router.post("/employee/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:
          "يرجى إدخال البريد الإلكتروني وكلمة المرور",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const employee = await Employee.findOne({
      email: cleanEmail,
    });

    if (!employee) {
      return res.status(401).json({
        message:
          "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    const validPassword =
      await employee.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({
        message:
          "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    const token = createToken(employee);

    return res.json({
      message: "تم تسجيل الدخول بنجاح",
      token,
      user: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: "employee",
      },
    });
  } catch (error) {
    console.error(
      "EMPLOYEE LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "حدث خطأ أثناء تسجيل الدخول",
    });
  }
});


router.post("/student/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message:
          "يرجى إدخال البريد الإلكتروني وكلمة المرور",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const student = await Student.findOne({
      email: cleanEmail,
    });

    if (!student) {
      return res.status(401).json({
        message:
          "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    const validPassword =
      await student.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({
        message:
          "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    }

    const token = createToken(student);

    return res.json({
      message: "تم تسجيل الدخول بنجاح",
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        major: student.major,
        age: student.age,
        role: "student",
      },
    });
  } catch (error) {
    console.error(
      "STUDENT LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "حدث خطأ أثناء تسجيل الدخول",
    });
  }
});

module.exports = router;