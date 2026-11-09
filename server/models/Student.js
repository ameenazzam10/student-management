const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
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

    major: {
      type: String,
      default: "",
      trim: true,
    },

    age: {
      type: Number,
      default: null,
    },

    role: {
      type: String,
      default: "student",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

studentSchema.methods.comparePassword = function (
  password
) {
  return bcrypt.compare(password, this.password);
};

module.exports =
  mongoose.models.Student ||
  mongoose.model("Student", studentSchema);