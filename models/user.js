import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

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
