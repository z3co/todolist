import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	user_name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		match: /.+\@.+\..+/,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
});

userSchema.pre("save", function (next) {
	const user = this;

	if (!user.isModified("password")) return next();
	if (user.isModified("password")) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) return next(err);

			// biome-ignore lint/complexity/useArrowFunction: <explanation>
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	}
});

userSchema.methods.comparePassword = (
	candidatePassword: string,
  // biome-ignore lint/suspicious/noExplicitAny: 
	cb: (arg: any, isMatch?: boolean) => void
) => {
  // @ts-ignore
  const passwordMatch: string = this.password ? this.password : "Jeppe";
	bcrypt.compare(candidatePassword, passwordMatch, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

const User = mongoose.model("User", userSchema);

export default User;
