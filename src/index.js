import express from "express";
import dotenv from "dotenv";
import devsRoutes from "./routes/devsRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/devs", devsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
