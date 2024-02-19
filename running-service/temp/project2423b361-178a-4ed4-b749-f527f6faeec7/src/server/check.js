const check = () => {
  return {
    statusCode: 200,
    body: { message: "Check" },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

module.exports = { check };
