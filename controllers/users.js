const User = require('../models/users');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
	signup,
	login
};

async function signup(req, res) {
	const user = new User(req.body);
	try {
		await user.save();
		const token = createJWT(user);
		res.json({ token });
	} catch (err) {
		res.status(400).json(err);
	}
}

function createJWT(user) {
	return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}

async function login(req, res) {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(401).json({ err: 'Invalid credentials' });
		user.comparePassword(req.body.pw, (err, isMatch) => {
			if (isMatch) {
				const token = createJWT(user);
				res.json({ token });
			} else {
				return res.status(401).json({ err: 'Invalid credentials' });
			}
		});
	} catch (err) {
		return res.status(401).json(err);
	}
}