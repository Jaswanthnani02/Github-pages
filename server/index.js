import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5050;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ status: "Available for select data + AI engagements" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`);
});
