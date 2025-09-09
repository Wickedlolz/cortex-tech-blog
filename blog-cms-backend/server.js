import app from "./app.js";
import env from "./src/config/env.js";
import { connectDB } from "./src/db/connect.js";

(async () => {
  await connectDB(env.MONGO_URI);
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on http://localhost:${env.PORT}`);
  });
})();
