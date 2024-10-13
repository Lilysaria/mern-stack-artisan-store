import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.set("toObject", {
  transform: (doc, ret, opt) => {
    delete ret.password;
    return ret;
  },
});

// hash password before saving
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// method to compare password
userSchema.methods.comparePassword = function (tryPassword) {
  return bcrypt.compare(tryPassword, this.password);
};

// check if the model is already defined
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
