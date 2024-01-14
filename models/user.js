import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

/**
 * Schema for a User document in MongoDB using Mongoose.
 * Represents a user with email, password, and role.
 * 
 * - `email`: String, required, unique. Validates the email using validator.js.
 * - `password`: String, required. Validates the password strength using validator.js.
 * - `role`: String. The user's role, restricted to certain predefined values.
 *           Defaults to 'Désactivé' (Disabled).
 * - Timestamps: Automatically adds createdAt and updatedAt fields to the schema.
 * 
 * Includes a pre-save hook to hash the password before saving to the database.
 * Also includes a method to compare a candidate password with the user's hashed password.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'L\'email est invalide.'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
    }
  },
  role: {
    type: String,
    enum: ['Administrateur', 'Editeur', 'Lecteur', 'Invité', 'Désactivé'],
    default: 'Désactivé'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) { 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
