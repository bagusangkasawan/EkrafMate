import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-zA-Z0-9_]+$/ },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['creative', 'client', 'admin'], default: 'creative' },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,
  headline: { type: String },
  description: { type: String },
  skills: [{ type: String }],
  portfolio: [{ title: String, url: String }],
  profileEmbedding: { type: [Number] }
}, { timestamps: true });

userSchema.methods.matchPassword = async function(enteredPassword) { return await bcrypt.compare(enteredPassword, this.password); };

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) { next(); }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getVerificationToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.verificationToken = crypto.createHash('sha256').update(token).digest('hex');
    this.verificationTokenExpires = Date.now() + 10 * 60 * 1000;
    return token;
};

const User = mongoose.model('User', userSchema);
export default User;
