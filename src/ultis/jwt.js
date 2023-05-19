// Import JSON Web Token
const jwt = require("jsonwebtoken");
const { successCode } = require("../ultis/respondse");
//Tạo token
const generateToken = (data) => {
  //data: string, number, object, buffer không khai báo tham số thứ 3, có tham số thứ 3 thì không được có kiểu string
  let token = jwt.sign(data, "node-30", {
    algorithm: "HS256",
    expiresIn: "5m",
  });
  return token;
};
//Kiểm tra token
const checkToken = (token) => {
  let data = jwt.verify(token, "node-30");
  return data;
};
// Giải mã token
const decodeToken = (token) => {
  return jwt.decode(token);
};
const privateAPI = (req, res, next) => {
  let { refreshToken, oldAccessToken } = req.body;
  try {
    let { token } = req.headers;
    checkToken(token);
    console.log(checkToken(token));
    next();
  } catch (err) {
    console.log(err);
    if ((err.name = "TokenExpiredError" && refreshToken == true)) {
      let userData = {
        user: decodeToken(oldAccessToken).user,
        role:"user"
      }
      let token = generateToken(userData);
      successCode(res, token,userData);
    } else {
      res.status(401).send(err.message);
    }
  }
};
module.exports = {
  generateToken,
  checkToken,
  decodeToken,
  privateAPI,
};
