const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (tryPassword) {
  return bcrypt.compare(tryPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
