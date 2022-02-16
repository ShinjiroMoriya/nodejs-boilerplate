import fs from "fs";
import dotenv from "dotenv";

export default (() => {
  try {
    fs.readFileSync(".env");
    dotenv.config();
  } catch (err) {}
})();
