const express = require("express");

const Student = require("../models/Student");
const {
  protect,
  employeeOnly,
  studentOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   الموظف ينشئ طالب
========================= */

router.post("/", protect, employeeOnly, async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      major,
      age,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "الاسم والبريد وكلمة المرور مطلوبة",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      });
    }

    const existingStudent = await Student.findOne({
      email: email.toLowerCase(),
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "يوجد طالب مسجل بهذا البريد مسبقاً",
      });
    }

    const student = await Student.create({
      name,
      email: email.toLowerCase(),
      password,
      major: major || "",
      age: age || null,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "تم إنشاء حساب الطالب بنجاح",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        major: student.major,
        age: student.age,
        role: student.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "حدث خطأ أثناء إنشاء الطالب",
    });
  }
});

/* =========================
   عرض الطلاب للموظف
========================= */

router.get("/", protect, employeeOnly, async (req, res) => {
  try {
    const students = await Student.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "حدث خطأ أثناء جلب الطلاب",
    });
  }
});

/* =========================
   بيانات الطالب الحالي
========================= */

router.get("/me", protect, studentOnly, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "الطالب غير موجود",
      });
    }

    res.json(student);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "حدث خطأ",
    });
  }
});

module.exports = router;