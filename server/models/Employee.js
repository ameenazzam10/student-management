const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);

/* تشفير كلمة المرور */
employeeSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

/* مقارنة كلمة المرور */
employeeSchema.methods.comparePassword = function (
  password
) {
  return bcrypt.compare(password, this.password);
};

module.exports =
  mongoose.models.Employee ||
  mongoose.model("Employee", employeeSchema);