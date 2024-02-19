const main = async () => {
  return {
    statusCode: 200,
    body: { message: "Hello World!" },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

module.exports = { main };
