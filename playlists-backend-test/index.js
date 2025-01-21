const app = require("./app");
const logger = require("./utils/logger")
require("dotenv").config();
app.listen(process.env.port, () => {
  logger.log(`Server is running on port ${process.env.port}`);
});