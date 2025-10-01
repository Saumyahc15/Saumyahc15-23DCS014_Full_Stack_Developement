const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.toSafeObject = function () {
  return { id: this._id, name: this.name, email: this.email };
};

module.exports = mongoose.model('User', userSchema);


