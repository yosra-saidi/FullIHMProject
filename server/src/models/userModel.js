import mongoose from 'mongoose';
import validator from 'validator'; // Make sure to install the validator library
import bcrypt from 'bcrypt'; // Make sure to install bcrypt

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    height: {
        type: Number,
        required: true,
        min: [1, "Height must be a positive number"],
    },
    weight: {
        type: Number,
        required: true,
        min: [1, "Weight must be a positive number"],
    },
    healthStatus: {
        type: String,
        enum: ["Healthy", "Sick", "At Risk"],
        default: "Healthy",
    },
    goals: [
        {
            goal: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
            status: { type: String, enum: ["Active", "Stopped", "Cancelled", "Ended"], default: "Active" },
        },
    ],
    exercisePlan: [
        {
            exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
            status: { type: String, enum: ["Started", "Stopped", "Cancelled", "Ended"], default: "Started" },
        },
    ],
    dietPlan: [
        {
            diet: { type: mongoose.Schema.Types.ObjectId, ref: "Diet" },
            status: { type: String, enum: ["Started", "Stopped", "Cancelled", "Ended"], default: "Started" },
        },
    ],
});

// Static method for user signup
userSchema.statics.signup = async function (email, password, dateOfBirth, gender, height, weight, healthStatus) {
    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already in use');
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = await this.create({
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      height,
      weight,
      healthStatus,
    });
  
    return user;
  };
  
  // Static method for user login
  userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
  
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid email or password');
    }
  
    return user;
  };

export default mongoose.model("User", userSchema);
