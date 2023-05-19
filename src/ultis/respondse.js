// 200 success code
const successCode = (res, message, data, statusCode) => {
  res.status(statusCode).json({
    statusCode:200,
    message,
    data,
  });
};
// 400 fail code
const failCode = (res, message,data, statusCode) => {
  res.status(statusCode).json({
    statusCode:statusCode,
    message,
    data
  });
};
//500 error code
const errorCode = (res, message) => {
    res.status(500).json({
      statusCode:500,
      message,
    });
  };

  module.exports = {
    successCode,
    failCode,
    errorCode
  }