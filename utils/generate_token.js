const jwt = require("jsonwebtoken");

const generate_user_token = (user) => {
  const token = jwt.sign({ ...user }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = generate_user_token;
